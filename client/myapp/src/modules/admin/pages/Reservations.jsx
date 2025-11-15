import { useEffect, useState } from 'react'
import { adminService } from '../../../application/services/adminService'
import AdminLayout from '../Layout'

export default function AdminReservations() {
  const [list, setList] = useState(null)

  useEffect(() => { adminService.reservationsOverview().then(setList) }, [])

  return (
    <AdminLayout>
      <div className="adm__section">
        <h2>Reservations Overview</h2>
        {!list ? <div className="adm__card">Loading...</div> : (
          list.length === 0 ? <div className="adm__card">No reservations.</div> : (
            <div className="adm__table">
              <div className="adm__thead">
                <div>ID</div>
                <div>Stadium</div>
                <div>Date</div>
                <div>Slots</div>
                <div>Status</div>
              </div>
              {list.map(r => (
                <div key={r.id} className="adm__trow">
                  <div>{r.id}</div>
                  <div>{r.stadiumName}</div>
                  <div>{r.date}</div>
                  <div>{r.slots.join(', ')}</div>
                  <div><span className={`adm__status adm__status--${r.status}`}>{r.status}</span></div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </AdminLayout>
  )
}
