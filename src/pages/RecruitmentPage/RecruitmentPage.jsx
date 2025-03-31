import { useState, useEffect } from 'react'
import './RecruitmentPage.css'

export default function RecruitmentPage({ onClose, onSubmit }) {
  const [propaganda, setPropaganda] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    skills: '',
    loyalty: ''
  })

  const propagandaMessages = [
    "HYDRA: SHAPING TOMORROW'S WORLD ORDER",
    "COMPLIANCE WILL BE REWARDED",
    "TOGETHER WE RISE, DIVIDED THEY FALL",
    "ORDER THROUGH STRENGTH",
    "JOIN US AND BE REBORN",
    "THE NEW WORLD NEEDS YOU",
    "SURRENDER YOUR PAST, EMBRACE YOUR FUTURE"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * propagandaMessages.length)
      setPropaganda(propagandaMessages[randomIndex])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="recruitment-page">
      <div className="scan-line"></div>
      <div className="terminal-overlay"></div>

      <button className="back-button" onClick={onClose}>
        « RETURN TO TERMINAL
      </button>

      <div className="propaganda-section">
        <div className="propaganda-banner">
          <div className="propaganda-text">{propaganda}</div>
        </div>
        
        <div className="zola-interface">
          <div className="zola-image"></div>
          <div className="interface-overlay"></div>
        </div>
      </div>

      <div className="recruitment-form-container">
        <h2>HYDRA RECRUITMENT INTERFACE</h2>
        <form onSubmit={handleSubmit} className="recruitment-form">
          <div className="form-group">
            <label>OPERATIVE DESIGNATION</label>
            <div className="input-container">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <span className="cursor"></span>
            </div>
          </div>

          <div className="form-group">
            <label>CURRENT LOCATION</label>
            <div className="input-container">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
              <span className="cursor"></span>
            </div>
          </div>

          <div className="form-group">
            <label>STRATEGIC ASSETS</label>
            <div className="input-container">
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                required
              />
              <span className="cursor"></span>
            </div>
          </div>

          <div className="form-group">
            <label>LOYALTY DECLARATION</label>
            <div className="input-container">
              <textarea
                value={formData.loyalty}
                onChange={(e) => setFormData({...formData, loyalty: e.target.value})}
                required
                rows={3}
                placeholder="DECLARE YOUR LOYALTY TO HYDRA"
              />
              <span className="cursor"></span>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">CONFIRM ALLEGIANCE</button>
            <button type="button" onClick={onClose} className="abort-button">
              TERMINATE RECRUITMENT
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}