import { useState, useEffect } from 'react'
import './EntryDetail.css'
import { getImage } from '../../utils/imageStorage'

export default function EntryDetail({ entry, onClose }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])

  const getEntryImage = (entry) => {
    return entry.imageKey ? getImage(entry.imageKey) : entry.image
  }

  if (loading) {
    return (
      <div className="entry-detail-overlay">
        <img src="/src/assets/waiting.gif" alt="Loading" className="loading-gif" />
        <div className="loading-text">ACCESSING ARCHIVES...</div>
      </div>
    )
  }

  return (
    <div className="entry-detail-overlay">
      <div className="entry-detail-container">
        <div className="entry-header">
          <h2>{entry.title}</h2>
          <div className="metadata">
            <span>{entry.date}</span>
            <span>LOCATION: {entry.location}</span>
            <span>TIME: {entry.time}</span>
          </div>
        </div>

        <div className="entry-content">
          <div className="entry-image-container">
            <img src={getEntryImage(entry)} alt={entry.title} />
            <div className="image-overlay"></div>
          </div>
          <div className="entry-text">{entry.description}</div>
        </div>

        <button className="close-button" onClick={onClose}>CLOSE FILE</button>
      </div>
    </div>
  )
}