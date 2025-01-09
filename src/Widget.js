export default function Widget({ icon: Icon, label, value }) {
  return (
    <div className="widget-content">
      <span className="widget-icon">
        <Icon />
      </span>
      <span className="widget-content-details">
        <span className="widget-label">{label}</span>
        <span className="widget-value">{value}</span>
      </span>
    </div>
  );
}
