import React from 'react'

function TokenList({ tokens, items }) {
  return (
    <div className="token-list">
      <h2>🪙 Tokenlar Ro'yxati</h2>
      <p className="subtitle">Omboringuz tokenizatsiyalashtirilgan aktivlar</p>
      
      {Object.entries(tokens).length === 0 ? (
        <p className="empty-state">Hali tokenlar yo'q. Avval mahsulot qo'shing.</p>
      ) : (
        <div className="tokens-grid">
          {Object.entries(tokens).map(([tokenId, token]) => (
            <div key={tokenId} className="token-card">
              <div className="token-header">
                <h3>{token.item_name}</h3>
                <span className="token-id">{tokenId}</span>
              </div>
              <div className="token-body">
                <p><strong>Miqdori:</strong> {token.total_quantity} dona</p>
                <p><strong>Jami Qiymat:</strong> {token.total_value.toLocaleString()} so'm</p>
                <p><strong>Birlik Narxi:</strong> {token.price_per_token.toLocaleString()} so'm</p>
                <div className="token-progress">
                  <div className="progress-bar" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="token-footer">
                <button className="btn btn-secondary">Transfer</button>
                <button className="btn btn-secondary">Sotish</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TokenList
