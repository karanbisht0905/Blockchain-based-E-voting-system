import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content fade-in">
        <div className="home-header">
          <h1 className="home-title">
            <span className="title-gradient">Blockchain</span>
            <br />
            E-Voting System
          </h1>
          <p className="home-subtitle">
            Secure, Transparent, and Decentralized Voting Platform
          </p>
        </div>

        <div className="home-cards">
          <div className="home-card glass slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="card-icon">👤</div>
            <h2>User Portal</h2>
            <p>Cast your vote securely on the blockchain</p>
            <div className="card-buttons">
              <Link to="/user/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/user/signup" className="btn btn-outline">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="home-card glass slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="card-icon">🛡️</div>
            <h2>Admin Portal</h2>
            <p>Manage elections and monitor results</p>
            <div className="card-buttons">
              <Link to="/admin/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/admin/signup" className="btn btn-outline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <div className="home-features">
          <div className="feature glass">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Blockchain encryption ensures vote integrity</p>
          </div>
          <div className="feature glass">
            <div className="feature-icon">👁️</div>
            <h3>Transparent</h3>
            <p>Public ledger for verifiable results</p>
          </div>
          <div className="feature glass">
            <div className="feature-icon">⚡</div>
            <h3>Fast</h3>
            <p>Instant vote processing and results</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

