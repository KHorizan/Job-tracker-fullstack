import "../../Styles/StatsCard.css";

function StatsCard({title,value,subtitle,className=""}){
  return(
    <div className={`stats-card`}>
      <h2 className="stats-title">{title}</h2>
      <p className="stats-value">{value}</p>
      {subtitle && <p className="stats-subtitle" title={subtitle}>{subtitle}</p>}
    </div>

  );
}
export default StatsCard;