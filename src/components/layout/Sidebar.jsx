import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">D</div>
        <h2>DevTrack</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/projects">
          📁 Projects
        </NavLink>

        <NavLink to="/issues">
          🐛 Issues
        </NavLink>

        {(user?.role === "ADMIN") &&
          <NavLink to="/team">
            👥 Team
          </NavLink>
        }

        <NavLink to="/board">📋 Board</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;