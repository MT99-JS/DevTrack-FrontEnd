function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h3>Dashboard</h3>
      </div>

      <div className="navbar-right">
        <button className="notification-button">
          🔔
        </button>

        <div className="user-profile">
          <div className="avatar">
            JD
          </div>

          <div>
            <strong>John Doe</strong>
            <span>Developer</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;