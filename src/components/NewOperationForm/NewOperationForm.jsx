import { useState, useEffect } from 'react'
import './NewOperationForm.css'
import { storeImage } from '../../utils/imageStorage'

export default function NewOperationForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    image: null,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString()
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageKey = await storeImage(file)
      setFormData({ ...formData, imageKey })
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      image: formData.imageKey // Pass the imageKey instead of file
    })
  }

  return (
    <div className="operation-page">
      <div className="scan-line"></div>
      <div className="terminal-overlay"></div>
      
      <header className="operation-header">
        <div className="header-content">
          <h1>HYDRA OPERATION LOGGER</h1>
          <div className="status-container">
            <div className="time-display">{currentTime}</div>
            <div className="status">CLEARANCE: LEVEL 7</div>
          </div>
        </div>
      </header>

      <div className="operation-content">
        <div className="form-section">
          <h2>INITIALIZE NEW OPERATION</h2>
          <form className="operation-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>OPERATION DESIGNATION</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>LOCATION</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="form-columns">
              <div className="form-group">
                <label>DATE</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>TIME</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>SURVEILLANCE IMAGERY</label>
              <div 
                className="image-upload-area" 
                onClick={() => document.getElementById('image-input').click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <span>CLICK TO UPLOAD IMAGE</span>
                    <div className="scan-line"></div>
                  </div>
                )}
              </div>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>

            <div className="form-group">
              <label>OPERATION DETAILS</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={6}
              />
            </div>
          </form>
        </div>

        <div className="preview-section">
          <h2>OPERATION PREVIEW</h2>
          <div className="preview-card">
            <div className="preview-header">
              <h3>{formData.title || 'OPERATION DESIGNATION'}</h3>
              <div className="preview-metadata">
                <span>{formData.date}</span>
                <span>{formData.time}</span>
                <span>{formData.location}</span>
              </div>
            </div>
            <div className="preview-image">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <div className="no-image">NO SURVEILLANCE IMAGERY</div>
              )}
            </div>
            <div className="preview-description">
              {formData.description || 'AWAITING OPERATION DETAILS'}
            </div>
          </div>
        </div>
      </div>

      <div className="operation-controls">
        <button type="button" className="control-button" onClick={onClose}>
          ABORT MISSION
        </button>
        <button type="submit" className="control-button confirm" onClick={handleSubmit}>
          CONFIRM OPERATION
        </button>
      </div>
    </div>
  )
}