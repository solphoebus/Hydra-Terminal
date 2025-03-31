import { useState, useEffect } from 'react'
import './TimeCapsule.css'

export default function TimeCapsule({ entries }) {
  const [randomEntry, setRandomEntry] = useState(null)

  useEffect(() => {
    const pickRandomEntry = () => {
      const randomIndex = Math.floor(Math.random() * entries.length)
      setRandomEntry(entries[randomIndex])
    }

    pickRandomEntry()
    const interval = setInterval(pickRandomEntry, 10000)
    return () => clearInterval(interval)
  }, [entries])

  if (!randomEntry) return null

  return (
    <div className="time-capsule">
      <h3>TIME CAPSULE</h3>
      <div className="capsule-date">{randomEntry.date}</div>
      <div className="capsule-content">
        <img src={randomEntry.image} alt={randomEntry.title} />
        <div className="capsule-text">
          <h4>{randomEntry.title}</h4>
          <p>{randomEntry.description}</p>
          <div className="capsule-metadata">
            <span>{randomEntry.time}</span>
            <span>{randomEntry.location}</span>
          </div>
        </div>
      </div>
      <div className="scan-effect"></div>
    </div>
  )
}