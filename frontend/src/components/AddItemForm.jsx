import React, { useState } from 'react'
import axios from 'axios'
import '../styles.css'

const API_BASE = 'http://localhost:8000'

function AddItemForm({ onItemAdded, token }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    quantity: '',
    unit_price: '',
    category: '',
    purchase_date: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.quantity || !formData.unit_price || !formData.category) {
      setMessage('⚠️ Barcha maydonlarni to\'ldiring')
      return
    }

    try {
      setLoading(true)
      const payload = {
        ...formData,
        id: formData.id || `item-${Date.now()}`,
        quantity: parseFloat(formData.quantity),
        unit_price: parseFloat(formData.unit_price),
        purchase_date: formData.purchase_date || new Date().toISOString().split('T')[0]
      }

      await axios.post(`${API_BASE}/items/add`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('✅ Mahsulot muvaffaqiyatli qo\'shildi!')
      setFormData({
        id: '',
        name: '',
        quantity: '',
        unit_price: '',
        category: '',
        purchase_date: '',
        description: ''
      })
      onItemAdded()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ Xato: ' + error.response?.data?.detail || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-item-form">
      <h2>➕ Yangi Mahsulot Qo'shish</h2>
      {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Mahsulot nomi"
          value={formData.name}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Miqdori (dona)"
          value={formData.quantity}
          onChange={handleChange}
          className="input"
          step="0.01"
          required
        />

        <input
          type="number"
          name="unit_price"
          placeholder="Birlik narxi (so'm)"
          value={formData.unit_price}
          onChange={handleChange}
          className="input"
          step="0.01"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Kategoriya tanlang</option>
          <option value="xomashyo">Xomashyo</option>
          <option value="texnika">Texnika</option>
          <option value="mahsulot">Tayyor Mahsulot</option>
          <option value="uy-xo'jaliq">Uy-xo'jaliq buyumlari</option>
          <option value="boshqa">Boshqa</option>
        </select>

        <input
          type="date"
          name="purchase_date"
          value={formData.purchase_date}
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="description"
          placeholder="Qo'shimcha ma'lumot (ixtiyoriy)"
          value={formData.description}
          onChange={handleChange}
          className="input textarea"
        />

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Qo\'shilmoqda...' : 'Mahsulotni Qo\'shish'}
        </button>
      </form>
    </div>
  )
}

export default AddItemForm
