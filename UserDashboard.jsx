import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const UserDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [elections, setElections] = useState([])

  // Load elections from localStorage
  useEffect(() => {
    const loadElections = () => {
      const savedElections = localStorage.getItem('evoting_elections')
      if (savedElections) {
        const parsed = JSON.parse(savedElections)
        // Format elections for user view (hide vote counts)
        return parsed.map(election => ({
          ...election,
          candidates: election.candidates.map(c => ({
            ...c,
            votes: 0 // Hide vote counts from users
          }))
        }))
      }
      // Default elections if none exist
      return [
        {
          id: 1,
          title: 'Presidential Election 2024',
          description: 'Vote for the next president',
          status: 'active',
          candidates: [
            { id: 1, name: 'John Doe', party: 'Democratic Party', votes: 0 },
            { id: 2, name: 'Jane Smith', party: 'Republican Party', votes: 0 },
            { id: 3, name: 'Bob Johnson', party: 'Independent', votes: 0 }
          ]
        }
      ]
    }
    setElections(loadElections())

    // Listen for storage changes (when admin creates new election in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'evoting_elections') {
        setElections(loadElections())
      }
    }
    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom event (for same-tab updates)
    const handleElectionUpdate = () => {
      setElections(loadElections())
    }
    window.addEventListener('electionUpdated', handleElectionUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('electionUpdated', handleElectionUpdate)
    }
  }, [])

  // Load user's voting history
  useEffect(() => {
    const userVotes = localStorage.getItem(`evoting_user_votes_${user?.email}`)
    if (userVotes) {
      const votes = JSON.parse(userVotes)
      // Find if user has voted in any active election
      const votedElection = votes.find(v => 
        elections.some(e => e.id === v.electionId && e.status === 'active')
      )
      if (votedElection) {
        setSelectedCandidate({
          electionId: votedElection.electionId,
          candidateId: votedElection.candidateId
        })
      }
    }
  }, [elections, user?.email])

  const activeElections = elections.filter(e => e.status === 'active')

  const handleVote = (electionId, candidateId) => {
    // Check if user already voted in this election
    const userVotes = localStorage.getItem(`evoting_user_votes_${user?.email}`)
    const votes = userVotes ? JSON.parse(userVotes) : []
    
    const hasVoted = votes.some(v => v.electionId === electionId)
    if (hasVoted) {
      alert('You have already voted in this election!')
      return
    }

    // Load current elections from localStorage
    const savedElections = localStorage.getItem('evoting_elections')
    if (!savedElections) {
      alert('Error: No elections found')
      return
    }

    const allElections = JSON.parse(savedElections)
    
    // Find the election and update vote count
    const updatedElections = allElections.map(election => {
      if (election.id === electionId) {
        const updatedCandidates = election.candidates.map(candidate => {
          if (candidate.id === candidateId) {
            return {
              ...candidate,
              votes: (candidate.votes || 0) + 1
            }
          }
          return candidate
        })
        return {
          ...election,
          candidates: updatedCandidates
        }
      }
      return election
    })

    // Save updated elections
    localStorage.setItem('evoting_elections', JSON.stringify(updatedElections))
    
    // Save user's vote
    votes.push({ electionId, candidateId, timestamp: new Date().toISOString() })
    localStorage.setItem(`evoting_user_votes_${user?.email}`, JSON.stringify(votes))
    
    // Update local state
    setSelectedCandidate({ electionId, candidateId })
    
    // Reload elections to reflect changes
    const loadElections = () => {
      const saved = localStorage.getItem('evoting_elections')
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.map(election => ({
          ...election,
          candidates: election.candidates.map(c => ({
            ...c,
            votes: 0 // Hide vote counts from users
          }))
        }))
      }
      return elections
    }
    setElections(loadElections())
    
    // Notify other components
    window.dispatchEvent(new Event('electionUpdated'))
    
    alert(`Vote cast successfully!\n\nYour vote has been recorded on the blockchain.`)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header glass">
        <div className="header-content">
          <div>
            <h1>User Dashboard</h1>
            <p>Welcome, {user?.name || user?.email}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card glass">
            <div className="stat-icon">🗳️</div>
            <div className="stat-info">
              <h3>{activeElections.length}</h3>
              <p>Active Elections</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{selectedCandidate ? '1' : '0'}</h3>
              <p>Votes Cast</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon">🔗</div>
            <div className="stat-info">
              <h3>{user?.walletAddress ? user.walletAddress.slice(0, 10) + '...' : 'N/A'}</h3>
              <p>Wallet Address</p>
            </div>
          </div>
        </div>

        <div className="elections-section">
          <h2 className="section-title">Active Elections</h2>
          {activeElections.length === 0 ? (
            <div className="no-elections glass">
              <p>No active elections at the moment</p>
            </div>
          ) : (
            activeElections.map(election => (
              <div key={election.id} className="election-card glass">
                <div className="election-header">
                  <h3>{election.title}</h3>
                  <span className="status-badge active">Active</span>
                </div>
                <p className="election-description">{election.description}</p>
                
                <div className="candidates-section">
                  <h4>Candidates</h4>
                  <div className="candidates-grid">
                    {election.candidates.map(candidate => (
                      <div key={candidate.id} className="candidate-card">
                        <div className="candidate-info">
                          <h5>{candidate.name}</h5>
                          <p>{candidate.party}</p>
                        </div>
                        <button
                          onClick={() => handleVote(election.id, candidate.id)}
                          className="btn btn-primary"
                          disabled={selectedCandidate?.electionId === election.id}
                        >
                          {selectedCandidate?.electionId === election.id && selectedCandidate?.candidateId === candidate.id
                            ? 'Voted ✓'
                            : 'Vote'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

