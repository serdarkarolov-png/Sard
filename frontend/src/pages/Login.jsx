import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Login.css'

const API_BASE = 'http://localhost:8000'

function Login({ onLogin }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        username,
        password
      })

      const { access_token, user, role } = response.data
      onLogin(access_token, { username: user, role })
    } catch (err) {
      setError('❌ Login xatosi: Username yoki parol noto\'g\'ri')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🏭 SmartInventory</h1>
        <p className="subtitle">Tadbirkorlar uchun AI-powered ombor boshqaruvi</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>👤 Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Admin username"
              className="input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>🔐 Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              className="input"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn btn-primary btn-large">
            {loading ? '⏳ Kirilmoqda...' : '✅ Kirish'}
          </button>
        </form>

        <div className="demo-info">
          <h3>Demo Foydalanuvchi:</h3>
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
