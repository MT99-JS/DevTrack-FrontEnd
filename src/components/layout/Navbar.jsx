import { useAuth } from "../../context/AuthContext";

function Navbar() {

  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <div className="navbar-left">
        
      </div>

      <div className="navbar-right">
        <button className="notification-button">
          🔔
        </button>

        <div className="user-profile">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>

          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;