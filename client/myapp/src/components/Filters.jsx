import '../styles/components/Filters.css'

export default function Filters({ city, price, time, onChange }) {
  return (
    <div className="filters">
      <input className="filters__input" placeholder="City" value={city} onChange={e=>onChange({ city: e.target.value })} />
      <select className="filters__input" value={price} onChange={e=>onChange({ price: e.target.value })}>
        <option value="">Price</option>
        <option value="low">$</option>
        <option value="medium">$$</option>
        <option value="high">$$$</option>
      </select>
      <input className="filters__input" type="time" value={time} onChange={e=>onChange({ time: e.target.value })} />
    </div>
  )
}
