import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles.css'

const API_BASE = 'http://localhost:8000'

function AdminPanel({ token, onUserCreated }) {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Foydalanuvchilarni yuklashda xato:', error)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    if (!newUser.username || !newUser.password) {
      setMessage('⚠️ Username va parolni to\'ldiring')
      return
    }

    try {
      setLoading(true)
      await axios.post(
        `${API_BASE}/admin/users/create?username=${newUser.username}&password=${newUser.password}&role=${newUser.role}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Foydalanuvchi muvaffaqiyatli yaratildi!')
      setNewUser({ username: '', password: '', role: 'user' })
      fetchUsers()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ Xato: ' + error.response?.data?.detail || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (username) => {
    if (!confirm(`${username}'ni o'chirishni tasdiqlaysizmi?`)) return

    try {
      await axios.delete(`${API_BASE}/admin/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('✅ Foydalanuvchi o\'chirildi')
      fetchUsers()
    } catch (error) {
      setMessage('❌ Xato: ' + error.response?.data?.detail)
    }
  }

  return (
    <div className="admin-panel">
      <h2>⚙️ Admin Panel</h2>

      <div className="admin-section">
        <h3>➕ Yangi Foydalanuvchi Yaratish</h3>
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
        
        <form onSubmit={handleCreateUser} className="form">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="input"
          />
          <input
            type="password"
            placeholder="Parol"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="input"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="input"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Yaratilmoqda...' : 'Yaratish'}
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h3>👥 Barcha Foydalanuvchilar</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Yaratilgan</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td><span className={`role-badge role-${user.role}`}>{user.role}</span></td>
                <td>{new Date(user.created_at).toLocaleDateString('uz-UZ')}</td>
                <td>
                  {user.username !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(user.username)}
                      className="btn btn-danger btn-small"
                    >
                      O'chirish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPanel
