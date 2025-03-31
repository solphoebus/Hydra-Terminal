import { useState, useEffect } from 'react'
import './Dashboard.css'
import MemoriesTab from '../../components/MemoriesTab/MemoriesTab'
import EntryDetail from '../../components/EntryDetail/EntryDetail'
import NewOperationForm from '../../components/NewOperationForm/NewOperationForm'
import { getImage, removeImage } from '../../utils/imageStorage'

const mockEntries = [
  {
    id: 1,
    title: "Operation Blackout",
    date: "2025-03-31",
    location: "MADRIPOOR",
    image: "/src/assets/Entry1.jpg",
    imageKey: null,
    time: "23:45:12",
    description: "Deep cover operation successful. Target acquired. Awaiting extraction. Local forces remain unaware of infiltration. Asset secured in containment unit Delta-7."
  },
  {
    id: 2,
    title: "Project Insight",
    date: "2025-03-30",
    location: "LATVERIA",
    image: "/src/assets/Entry2.jpg",
    imageKey: null,
    time: "03:15:00",
    description: "Castle Doom surveillance complete. New defense systems identified. Weaknesses documented. Preparing full analysis for Command."
  },
  {
    id: 3,
    title: "Operation Ghost Protocol",
    date: "2025-03-29",
    location: "WAKANDA",
    image: "/src/assets/Entry3.jpg",
    imageKey: null,
    time: "19:20:33",
    description: "Vibranium detection systems bypassed. Border tribe patrols mapped. Ready to proceed with Phase 2 on Command authority."
  },
  {
    id: 4,
    title: "Neural Interface Beta",
    date: "2025-03-28",
    location: "NEW YORK",
    image: "/src/assets/Entry4.jpg",
    imageKey: null,
    time: "14:05:17",
    description: "Test subject showing positive response to neural implants. Cognitive enhancement at 300% above baseline. Minor side effects noted."
  },
  {
    id: 5,
    title: "Operation Red Dawn",
    date: "2025-03-27",
    location: "SOKOVIA",
    image: "/src/assets/Entry1.jpg",
    imageKey: null,
    time: "08:30:45",
    description: "Resistance cells neutralized. Local population under control. HYDRA influence established in key government positions."
  }
]

export default function Dashboard() {
  const [entries, setEntries] = useState(mockEntries)
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleNewOperation = async (formData) => {
    const newEntry = {
      id: entries.length + 1,
      ...formData,
      imageKey: formData.image,
      image: formData.image.startsWith('hydra-image') 
        ? getImage(formData.image) 
        : formData.image
    }
    setEntries([newEntry, ...entries])
    setShowNewEntry(false)
  }

  useEffect(() => {
    return () => {
      entries.forEach(entry => {
        if (entry.imageKey) {
          removeImage(entry.imageKey)
        }
      })
    }
  }, [])

  const getEntryImage = (entry) => {
    return entry.imageKey ? getImage(entry.imageKey) : entry.image
  }

  return (
    <div className="dashboard">
      <header>
        <h1>HYDRA OPERATIONS DATABASE</h1>
        <div className="time-display">{currentTime}</div>
      </header>

      <div className="dashboard-content">
        <MemoriesTab entries={entries} />
        
        <div className="entries-list">
          {entries.map(entry => (
            <div 
              key={entry.id} 
              className="entry-card"
              onClick={() => setSelectedEntry(entry)}
            >
              <img 
                src={getEntryImage(entry)} 
                alt={entry.title} 
                className="entry-image" 
              />
              <div className="entry-content">
                <div className="entry-header">
                  <h3 className="entry-title">{entry.title}</h3>
                  <div className="entry-metadata">
                    <div>{entry.date}</div>
                    <div>{entry.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEntry && (
        <EntryDetail 
          entry={selectedEntry} 
          onClose={() => setSelectedEntry(null)} 
        />
      )}

      <button 
        className="new-entry-button"
        onClick={() => setShowNewEntry(true)}
      >
        INITIATE NEW OPERATION
      </button>

      {showNewEntry && (
        <NewOperationForm 
          onSubmit={handleNewOperation}
          onClose={() => setShowNewEntry(false)}
        />
      )}
    </div>
  )
}