import { useState } from "react";
import "./About.css"; // Create this CSS file for styling

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="about-container">
      <div className="about-card">
        <h1>About Me</h1>

        <div className="profile-section">
          <div className="profile-text">
            <p>
              👋 Hi, I'm <span className="highlight">Vishesh</span>
            </p>
            <p>
              🎓 <span className="highlight">IIT(ISM) Dhanbad (2024-28)</span>
            </p>
            <p>
              📚 Pursuing BTech in{" "}
              <span className="highlight">Computer Science</span>
            </p>
          </div>
        </div>

        <div className="app-description">
          <h2>About This App</h2>
          <p>
            This is a <span className="highlight">Note-taking application</span>{" "}
            where you can:
          </p>
          <ul>
            <li>📝 Save your important notes</li>
            <li>🏷️ Add titles and categories to organize them</li>
            <li>🔒 Secure your notes with login authentication</li>
            {isExpanded && (
              <>
                <li>🔍 Easily search through your notes</li>
                <li>🌈 Customize the appearance</li>
                <li>📱 Access from any device</li>
              </>
            )}
          </ul>

          <button
            className="toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Show More Features"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
