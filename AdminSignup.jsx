import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Admin password must be at least 8 characters')
      return
    }

    if (!formData.adminKey) {
      setError('Admin key is required')
      return
    }

    // Simulate admin registration (replace with actual blockchain registration)
    if (formData.name && formData.email && formData.password && formData.adminKey) {
      login({
        email: formData.email,
        name: formData.name,
        role: 'admin',
        adminKey: formData.adminKey
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
          <h1>Admin Sign Up</h1>
          <p>Register as an administrator to manage the voting system</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="name">Admin Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter admin name"
              required
            />
          </div>

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
            <label htmlFor="adminKey">Admin Key</label>
            <input
              type="text"
              id="adminKey"
              name="adminKey"
              value={formData.adminKey}
              onChange={handleChange}
              placeholder="Enter admin authorization key"
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
              placeholder="Create a strong password (min 8 characters)"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
            Register as Admin
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an admin account?{' '}
            <Link to="/admin/login" className="auth-link">
              Login
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

export default AdminSignup

