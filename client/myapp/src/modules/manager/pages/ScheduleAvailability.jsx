import { useEffect, useState } from 'react'
import { managerService } from '../../../application/services/managerService'
import ManagerLayout from '../Layout'

export default function ScheduleAvailability() {
  const [schedule, setSchedule] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    managerService.getSchedule().then(setSchedule)
  }, [])

  const updateDay = (day, value) => {
    setSchedule(s => ({ ...s, availability: { ...s.availability, [day]: value.split(',').map(v=>Number(v.trim())).filter(Boolean) } }))
  }

  const save = async () => {
    setSaving(true)
    await managerService.updateSchedule(schedule)
    setSaving(false)
  }

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  return (
    <ManagerLayout>
      <div className="mgr__section">
        <h2>Schedule & Availability</h2>
        {!schedule ? <div className="mgr__card">Loading...</div> : (
          <div className="mgr__form">
            {days.map((d,i)=> (
              <label key={i} className="mgr__field">
                <span>{d} hours (comma separated)</span>
                <input
                  value={(schedule.availability[i]||[]).join(', ')}
                  onChange={e=>updateDay(i, e.target.value)}
                  placeholder="e.g. 10, 11, 12, 13"
                />
              </label>
            ))}
            <button className="mgr__btn" onClick={save} disabled={saving}>{saving?'Saving...':'Save Changes'}</button>
          </div>
        )}
      </div>
    </ManagerLayout>
  )
}
