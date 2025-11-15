import { useEffect, useState } from 'react'
import { adminService } from '../../../application/services/adminService'
import AdminLayout from '../Layout'

export default function AdminHome() {
  const [list, setList] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => { adminService.stats().then(setStats) }, [])

  const load = async () => { const data = await adminService.listStadiums(); setList(data) }
  useEffect(() => { load() }, [])


  return (
    <AdminLayout>
      <div className="adm__section">
        <h2>Overview</h2>
        {!stats ? (
          <div className="adm__card">Loading...</div>
        ) : (
          <div className="adm__grid">
            <div className="adm__card"><div className="adm__metric">{stats.users}</div><div className="adm__label">Users</div></div>
            <div className="adm__card"><div className="adm__metric">{stats.stadiums}</div><div className="adm__label">Stadiums</div></div>
            <div className="adm__card"><div className="adm__metric">{stats.reservations}</div><div className="adm__label">Reservations</div></div>
          </div>
        )}
      </div>

        {!list ? <div className="adm__card" style={{marginTop:12}}>Loading...</div> : (
          <div className="adm__table" style={{marginTop:12}}>
            <div className="adm__thead">
              <div>Name</div>
              <div>City</div>
              <div>Price</div>
              <div>Actions</div>
            </div>
            {list.map(s => (
              <div key={s.id} className="adm__trow">
                <div>{s.name}</div>
                <div>{s.city}</div>
                <div>{s.price}</div>
                <div className="adm__row">
                  <button className="adm__btn adm__btn--sm" onClick={()=>edit(s)}>Edit</button>
                  <button className="adm__btn adm__btn--sm adm__btn--danger" onClick={()=>remove(s.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

    </AdminLayout>
  )
}
