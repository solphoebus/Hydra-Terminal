import { useState, useEffect } from 'react'
import { getImage } from '../../utils/imageStorage'
import './MemoriesTab.css'

export default function MemoriesTab({ entries }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % entries.length)
    }, 30000)
    return () => clearInterval(interval)
  }, [entries.length])

  const currentEntry = entries[currentIndex]

  const getEntryImage = (entry) => {
    return entry.imageKey ? getImage(entry.imageKey) : entry.image
  }

  return (
    <div className="memories-tab">
      <h3>ARCHIVED MEMORIES</h3>
      <div className="memory-card">
        <div className="memory-image-container">
          <img src={getEntryImage(currentEntry)} alt={currentEntry.title} />
          <div className="scan-overlay"></div>
        </div>
        <div className="memory-caption">
          <h4>{currentEntry.title}</h4>
          <p>{currentEntry.description}</p>
          <div className="memory-metadata">
            <span>{currentEntry.date}</span>
            <span>{currentEntry.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}