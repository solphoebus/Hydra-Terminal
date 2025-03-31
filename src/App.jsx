import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import RecruitmentPage from './pages/RecruitmentPage/RecruitmentPage'
import Dashboard from './pages/Dashboard/Dashboard'
import EntryDetail from './components/EntryDetail/EntryDetail'
import MemoriesTab from './components/MemoriesTab/MemoriesTab'

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [showRecruitment, setShowRecruitment] = useState(false)

  return (
    <div className="terminal-container">
      <div className="scan-line"></div>
      {showRecruitment ? (
        <RecruitmentPage 
          onClose={() => setShowRecruitment(false)}
          onSubmit={() => {
            setShowRecruitment(false)
            setIsAuthorized(true)
          }}
        />
      ) : !isAuthorized ? (
        <LandingPage 
          onLogin={() => setIsAuthorized(true)}
          onJoinClick={() => setShowRecruitment(true)}
        />
      ) : (
        <Dashboard />
      )}
    </div>
  )
}

export default App
