function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-card-content">
        <span className="stat-title">
          {title}
        </span>

        <strong className="stat-value">
          {value}
        </strong>
      </div>

      <div className="stat-icon">
        {icon}
      </div>

    </div>
  );
}

export default StatCard;