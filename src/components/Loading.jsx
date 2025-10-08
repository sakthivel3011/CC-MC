// components/Loading.jsx
import { useEffect, useState } from 'react'
import '../assets/styles/Loading.css'
import logo from '/icon.png' 
import logo1 from '/icon2.png'

const Loading = () => {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    // Set minimum loading time to 6 seconds (6000ms)
    // Progress will increase every 120ms, so we need 50 intervals to reach 100%
    // 50 intervals * 120ms = 6000ms = 6 seconds exactly
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2 // Increase by 2% every 120ms
      })
    }, 120) // Update every 120ms for 6 second duration

    // Change phase text every 2 seconds to show all phases during 6 seconds
    const phaseTimer = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 3)
    }, 2000)

    return () => {
      clearInterval(timer)
      clearInterval(phaseTimer)
    }
  }, [])

  const phases = [
    
  ]

  return (
    <div className="loading-container">
      {/* Animated background particles */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      <div className="loading-content">
        {/* Dual logo design */}
        <div className="logo-section">
          <div className="logo-container main-logo">
            <div className="logo-circle">
              <img src={logo1} alt="Club Logo" className="circular-logo primary" />
              <div className="logo-ring ring-1"></div>
              <div className="logo-ring ring-2"></div>
              <div className="logo-particles">
                <div className="particle p1">♪</div>
                <div className="particle p2">♫</div>
                <div className="particle p3">★</div>
                <div className="particle p4">♪</div>
                <div className="particle p5">♬</div>
                

              </div>
            </div>
            <div className="logo-glow main-glow"></div>
          </div>

          {/* Secondary logo */}
        
        </div>

        {/* Club Name */}
        <div className="club-name-simple">
          Cultural and Music Club
        </div>

        {/* Musical notes animation */}
        <div className="musical-notes">
          <div className="note note-1">♪</div>
          <div className="note note-2">♫</div>
          <div className="note note-3">♪</div>
          <div className="note note-4">♬</div>
        </div>
      </div>
    </div>
  )
}

export default Loading