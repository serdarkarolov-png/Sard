import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:8000'

function AIChatBot({ items, token }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Salom! Men sizning tadbirkorlik savollaring uchun AI maslahatganisiz. Qanday yordam bera alayman?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      setLoading(true)
      const response = await axios.post(`${API_BASE}/ai-chat`, { message: userMessage }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }])
    } catch (error) {
      console.error('Xato:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Xato yuz berdi. Iltimos, qayta urinib ko\'ring.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chatbot-container">
      <h2>🤖 AI Maslahatchi</h2>
      <p className="subtitle">Tadbirkorlik savollaring uchun AI dan yordam oling</p>
      
      <div className="chat-box">
        <div className="messages-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          {loading && <div className="message assistant"><div className="message-content">🤔 Fikirlanmoqda...</div></div>}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input-area">
          <div className="input-group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Sizning savol..."
              className="chat-input"
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="btn btn-primary"
            >
              ✈️ Jo'natish
            </button>
          </div>
        </div>
      </div>

      <div className="quick-questions">
        <h3>Tezkor savollar:</h3>
        <button className="quick-btn" onClick={() => setInput('Omborimning likvidlik vaziyati qanday?')}>
          Likvidlik haqida
        </button>
        <button className="quick-btn" onClick={() => setInput('Qaysi mahsulotlarni sating?')}>
          Tavsiya etilgan haraka
        </button>
        <button className="quick-btn" onClick={() => setInput('Moliyaviy risklar nima?')}>
          Risk tahlili
        </button>
      </div>
    </div>
  )
}

export default AIChatBot
