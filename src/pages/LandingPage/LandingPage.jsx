import { useState, useEffect } from 'react'
import './LandingPage.css'

export default function LandingPage({ onLogin, onJoinClick }) {
  const [credentials, setCredentials] = useState({
    operativeId: '',
    accessCode: ''
  })
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="landing-page">
      <div className="terminal-overlay"></div>
      <div className="scan-line"></div>
      
      <div className="login-container">
        <header className="terminal-header">
          <div className="time-display">{currentTime}</div>
          <h1>HYDRA TERMINAL v7.1.2</h1>
          <div className="status">STATUS: AWAITING AUTHORIZATION</div>
        </header>

        <div className="zola-container">
          <img src="/src/assets/Zola Dialogue.gif" alt="Dr. Zola" className="zola-image" />
        </div>

        <form onSubmit={handleSubmit} className="access-form">
          <div className="form-group">
            <label>OPERATIVE ID</label>
            <div className="input-container">
              <input
                type="text"
                value={credentials.operativeId}
                onChange={(e) => setCredentials({
                  ...credentials,
                  operativeId: e.target.value
                })}
                required
              />
              <span className="cursor"></span>
            </div>
          </div>

          <div className="form-group">
            <label>ACCESS CODE</label>
            <div className="input-container">
              <input
                type="password"
                value={credentials.accessCode}
                onChange={(e) => setCredentials({
                  ...credentials,
                  accessCode: e.target.value
                })}
                required
              />
              <span className="cursor"></span>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="glow-button">INITIALIZE</button>
            <button type="button" onClick={onJoinClick} className="glow-button">
              JOIN HYDRA
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}