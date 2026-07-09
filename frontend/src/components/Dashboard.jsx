import React, { useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import '../styles.css'

const API_BASE = 'http://localhost:8000'

function Dashboard({ items, tokens, onRefresh, token }) {
  const [priceUpdate, setPriceUpdate] = useState({
    item_id: '',
    current_price: '',
    market_price: '',
  })
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const chartData = items.map(item => ({
    name: item.name.substring(0, 10),
    value: item.quantity * item.unit_price,
    quantity: item.quantity
  }))

  const handlePriceUpdate = async (e) => {
    e.preventDefault()
    if (!priceUpdate.item_id || !priceUpdate.current_price || !priceUpdate.market_price) {
      alert('Barcha maydonlarni to\'ldiring')
      return
    }

    try {
      setLoading(true)
      const current = parseFloat(priceUpdate.current_price)
      const market = parseFloat(priceUpdate.market_price)
      const change = ((market - current) / current * 100).toFixed(2)

      const response = await axios.post(`${API_BASE}/price-update`, {
        item_id: priceUpdate.item_id,
        current_price: current,
        market_price: market,
        price_change_percent: parseFloat(change),
        timestamp: new Date().toISOString()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setAnalysis(response.data.ai_analysis)
      setPriceUpdate({ item_id: '', current_price: '', market_price: '' })
    } catch (error) {
      console.error('Xato:', error)
      alert('Narx yangilanishida xato')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📦 Jami Mahsulotlar</h3>
          <p className="stat-value">{totalItems}</p>
        </div>
        <div className="stat-card">
          <h3>💰 Ombor Qiymati</h3>
          <p className="stat-value">{totalValue.toLocaleString()} so\'m</p>
        </div>
        <div className="stat-card">
          <h3>🪙 Tokenlar</h3>
          <p className="stat-value">{Object.keys(tokens).length}</p>
        </div>
        <div className="stat-card">
          <h3>📈 Kategoriyalar</h3>
          <p className="stat-value">{new Set(items.map(i => i.category)).size}</p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="chart-container">
          <h2>Mahsulotlar bo\'yicha Qiymat Taqsimoti</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Qiymat (so\'m)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="price-update-section">
        <h2>📊 Narx Yangilanishini Kiritish</h2>
        <form onSubmit={handlePriceUpdate} className="form">
          <select
            value={priceUpdate.item_id}
            onChange={(e) => setPriceUpdate({ ...priceUpdate, item_id: e.target.value })}
            className="input"
          >
            <option value="">Mahsulot tanlang</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Joriy narx (so\'m)"
            value={priceUpdate.current_price}
            onChange={(e) => setPriceUpdate({ ...priceUpdate, current_price: e.target.value })}
            className="input"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Bozor narxi (so\'m)"
            value={priceUpdate.market_price}
            onChange={(e) => setPriceUpdate({ ...priceUpdate, market_price: e.target.value })}
            className="input"
          />

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'AI Tahlillanmoqda...' : 'AI Tahlil Qil'}
          </button>
        </form>
      </div>

      {analysis && (
        <div className="analysis-card">
          <h2>🤖 AI Tahlil Natijalari</h2>
          <div className="analysis-content">
            <p><strong>Mahsulot:</strong> {analysis.item_name}</p>
            <p><strong>Tahlil:</strong> {analysis.analysis}</p>
            <p><strong>Tavsiya:</strong> {analysis.recommendation}</p>
            <p><strong>Risk Darajasi:</strong> <span className={`risk-${analysis.risk_level.toLowerCase()}`}>{analysis.risk_level}</span></p>
            <p><strong>Haraj:</strong> {analysis.suggested_action}</p>
          </div>
        </div>
      )}

      <div className="items-table">
        <h2>Omborningiz</h2>
        <table>
          <thead>
            <tr>
              <th>Mahsulot</th>
              <th>Kategoriya</th>
              <th>Miqdori</th>
              <th>Narxi</th>
              <th>Umumiy Qiymat</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.unit_price.toLocaleString()} so\'m</td>
                <td><strong>{(item.quantity * item.unit_price).toLocaleString()} so\'m</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
