import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Simulate authentication (replace with actual blockchain auth)
    if (formData.email && formData.password) {
      login({
        email: formData.email,
        role: 'admin',
        name: formData.email.split('@')[0]
      })
      navigate('/admin/dashboard')
    } else {
      setError('Please fill in all fields')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card glass fade-in">
        <div className="auth-header">
          <h1>Admin Login</h1>
          <p>Access the admin dashboard to manage elections</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
            Login as Admin
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Need admin access?{' '}
            <Link to="/admin/signup" className="auth-link">
              Sign Up
            </Link>
          </p>
          <Link to="/" className="auth-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

