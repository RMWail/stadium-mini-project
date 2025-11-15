import { useEffect, useState } from 'react'
//import { managerService } from '../../../application/services/managerService'
import ManagerLayout from '../Layout'

export default function Pricing() {
  const [form, setForm] = useState({ perHour: ''})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    managerService.getPrices().then(p => setForm(p))
  }, [])

  const onChange = (v) => setForm(f => ({ ...f,v  }))

  const save = async () => {
    setSaving(true)
    await managerService.updatePrices({
      perHour: Number(form.perHour),
      perDay: Number(form.perDay),
      weekendMultiplier: Number(form.weekendMultiplier),
    })
    setSaving(false)
  }

  return (
    <ManagerLayout>
      <div className="mgr__section">
        <h2>Pricing</h2>
        <div className="mgr__form">
          <label className="mgr__field">
            <span>Price per hour</span>
            <input type="number" value={form.perHour} onChange={e=>onChange(e.target.value)} />
          </label>
 {/**
  * 
  *           <label className="mgr__field">
            <span>Price per day</span>
            <input type="number" value={form.perDay} onChange={e=>onChange('perDay', e.target.value)} />
          </label>
          <label className="mgr__field">
            <span>Weekend multiplier</span>
            <input type="number" step="0.1" value={form.weekendMultiplier} onChange={e=>onChange('weekendMultiplier', e.target.value)} />
          </label>
  */}
          <button className="mgr__btn" onClick={save} disabled={saving}>{saving?'Saving...':'Save Pricing'}</button>
        </div>
      </div>
    </ManagerLayout>
  )
}
