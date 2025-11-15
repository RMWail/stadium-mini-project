import '../styles/components/TimeSlots.css'

const HOURS = Array.from({ length: 14 }, (_, i) => 8 + i) // 08:00 - 21:00

export default function TimeSlots({ selected = [], onToggle }) {
  return (
    <div className="timeslots">
      {HOURS.map(h => {
        const label = `${String(h).padStart(2, '0')}:00`
        const active = selected.includes(h)
        return (
          <button key={h} className={`timeslots__slot ${active ? 'is-active' : ''}`} onClick={()=>onToggle?.(h)}>
            {label}
          </button>
        )
      })}
    </div>
  )
}
