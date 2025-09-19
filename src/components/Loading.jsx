// components/Loading.jsx
import '../assets/styles/Loading.css'
import logo from '/icon.png' 

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Animated background elements */}
        {/* Main logo container */}
        <div className="logo-container">
          <div className="logo-circle">
            <img src={logo} alt="Kongu Engineering College Logo" className="circular-logo" />
            <div className="logo-ring"></div>
            <div className="logo-particles">
              <div className="particle p1">♪</div>
              <div className="particle p2">♫</div>
              <div className="particle p3">♪</div>
              <div className="particle p4">♬</div>
              <div className="particle p6">★</div>
            </div>
          </div>
          <div className="logo-glow"></div>
        </div>
        <div className="text-content">
            <h1 className="college-name">
                Kongu Engineering College
            </h1>
            <h2 className="club-name">
                Cultural And Music Club
            </h2>
        </div>

      </div>
    </div>
  )
}

export default Loading