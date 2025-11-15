import { Link } from 'react-router-dom'
import '../styles/components/StadiumCard.css'

export default function StadiumCard({ stadium }) {
  
  return (
    <div className="stadium-card">
      <img  src={`data:image/png;base64,${stadium.picture}`} alt={stadium.name} className="stadium-card__img" />
      <div className="stadium-card__body">
        <h3 className="stadium-card__title">{stadium.name}</h3>
        <p className="stadium-card__meta">{stadium.city} • ${stadium.price}/h </p>
        <Link className="stadium-card__link" to={`/stadiums/${stadium.name}/reserve`}>reserve</Link>
      </div>
    </div>
  )
}
