import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('elections')

  // Load elections from localStorage or use default
  const loadElections = () => {
    const savedElections = localStorage.getItem('evoting_elections')
    if (savedElections) {
      return JSON.parse(savedElections)
    }
    return [
      {
        id: 1,
        title: 'Presidential Election 2024',
        description: 'Vote for the next president',
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        totalVotes: 1250,
        candidates: [
          { id: 1, name: 'John Doe', party: 'Democratic Party', votes: 650 },
          { id: 2, name: 'Jane Smith', party: 'Republican Party', votes: 450 },
          { id: 3, name: 'Bob Johnson', party: 'Independent', votes: 150 }
        ]
      }
    ]
  }

  const [elections, setElections] = useState(loadElections)

  // Track if we're updating elections (to prevent overwriting votes)
  const [isUpdating, setIsUpdating] = useState(false)

  // Save elections to localStorage only when admin creates/updates elections
  useEffect(() => {
    if (isUpdating) {
      localStorage.setItem('evoting_elections', JSON.stringify(elections))
      setIsUpdating(false)
      window.dispatchEvent(new Event('electionUpdated'))
    }
  }, [elections, isUpdating])

  // Listen for vote updates from users
  useEffect(() => {
    const handleElectionUpdate = () => {
      const updated = loadElections()
      setElections(prevElections => {
        const prevStr = JSON.stringify(prevElections)
        const updatedStr = JSON.stringify(updated)
        if (prevStr !== updatedStr) {
          return updated
        }
        return prevElections
      })
    }
    
    // Listen for custom event
    window.addEventListener('electionUpdated', handleElectionUpdate)
    
    // Listen for storage changes (cross-tab)
    const handleStorageChange = (e) => {
      if (e.key === 'evoting_elections') {
        const updated = loadElections()
        setElections(updated)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    
    // Poll for updates every 2 seconds (for same-tab vote updates)
    const interval = setInterval(() => {
      const updated = loadElections()
      setElections(prevElections => {
        const prevStr = JSON.stringify(prevElections)
        const updatedStr = JSON.stringify(updated)
        if (prevStr !== updatedStr) {
          return updated
        }
        return prevElections
      })
    }, 2000)
    
    return () => {
      window.removeEventListener('electionUpdated', handleElectionUpdate)
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, []) // Empty dependency array - only run once on mount

  const [newElection, setNewElection] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    candidates: [{ name: '', party: '' }]
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCreateElection = (e) => {
    e.preventDefault()
    // Simulate creating election (replace with blockchain transaction)
    const election = {
      id: elections.length > 0 ? Math.max(...elections.map(e => e.id)) + 1 : 1,
      ...newElection,
      status: 'active',
      totalVotes: 0,
      candidates: newElection.candidates.map((c, i) => ({
        id: i + 1,
        ...c,
        votes: 0
      }))
    }
    const updatedElections = [...elections, election]
    setIsUpdating(true)
    setElections(updatedElections)
    setNewElection({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      candidates: [{ name: '', party: '' }]
    })
    // Switch to elections tab to show the newly created election
    setActiveTab('elections')
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('electionUpdated'))
    alert('Election created successfully!')
  }

  const addCandidate = () => {
    setNewElection({
      ...newElection,
      candidates: [...newElection.candidates, { name: '', party: '' }]
    })
  }

  const updateCandidate = (index, field, value) => {
    const updated = [...newElection.candidates]
    updated[index][field] = value
    setNewElection({ ...newElection, candidates: updated })
  }

  const getTotalVotes = (election) => {
    return election.candidates.reduce((sum, c) => sum + c.votes, 0)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header glass">
        <div className="header-content">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user?.name || user?.email}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'elections' ? 'active' : ''}`}
            onClick={() => setActiveTab('elections')}
          >
            Manage Elections
          </button>
          <button
            className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create Election
          </button>
          <button
            className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            View Results
          </button>
        </div>

        {activeTab === 'elections' && (
          <div className="tab-content">
            <h2 className="section-title">All Elections</h2>
            {elections.map(election => (
              <div key={election.id} className="election-card glass">
                <div className="election-header">
                  <h3>{election.title}</h3>
                  <span className={`status-badge ${election.status}`}>
                    {election.status}
                  </span>
                </div>
                <p className="election-description">{election.description}</p>
                <div className="election-meta">
                  <span>Start: {election.startDate}</span>
                  <span>End: {election.endDate}</span>
                  <span>Total Votes: {getTotalVotes(election)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'create' && (
          <div className="tab-content">
            <h2 className="section-title">Create New Election</h2>
            <form onSubmit={handleCreateElection} className="create-election-form glass">
              <div className="input-group">
                <label>Election Title</label>
                <input
                  type="text"
                  value={newElection.title}
                  onChange={(e) => setNewElection({ ...newElection, title: e.target.value })}
                  placeholder="Enter election title"
                  required
                />
              </div>

              <div className="input-group">
                <label>Description</label>
                <input
                  type="text"
                  value={newElection.description}
                  onChange={(e) => setNewElection({ ...newElection, description: e.target.value })}
                  placeholder="Enter election description"
                  required
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newElection.startDate}
                    onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newElection.endDate}
                    onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="candidates-section">
                <div className="section-header">
                  <h4>Candidates</h4>
                  <button type="button" onClick={addCandidate} className="btn btn-secondary">
                    + Add Candidate
                  </button>
                </div>
                {newElection.candidates.map((candidate, index) => (
                  <div key={index} className="candidate-input-row">
                    <input
                      type="text"
                      placeholder="Candidate Name"
                      value={candidate.name}
                      onChange={(e) => updateCandidate(index, 'name', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Party"
                      value={candidate.party}
                      onChange={(e) => updateCandidate(index, 'party', e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                Create Election
              </button>
            </form>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="tab-content">
            <h2 className="section-title">Election Results</h2>
            {elections.map(election => (
              <div key={election.id} className="election-card glass">
                <div className="election-header">
                  <h3>{election.title}</h3>
                  <span className="stat-badge">Total Votes: {getTotalVotes(election)}</span>
                </div>
                <div className="results-section">
                  {election.candidates.map(candidate => {
                    const percentage = getTotalVotes(election) > 0
                      ? ((candidate.votes / getTotalVotes(election)) * 100).toFixed(1)
                      : 0
                    return (
                      <div key={candidate.id} className="result-item">
                        <div className="result-header">
                          <span className="candidate-name">{candidate.name}</span>
                          <span className="vote-count">{candidate.votes} votes ({percentage}%)</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

