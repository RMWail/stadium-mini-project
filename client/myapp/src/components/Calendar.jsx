import '../styles/components/Calendar.css'

export default function Calendar({ date, onChange }) {
  return (
    <div className="calendar">
      <input className="calendar__input" type="date" value={date} onChange={e=>onChange?.(e.target.value)} />
    </div>
  )
}
