import { useEffect, useState } from 'react'
import { adminService } from '../../../application/services/adminService'
import AdminLayout from '../Layout'

export default function Stadiums() {

  const [form, setForm] = useState({ name: '', city: '', price: 0, cover: '' })
  const [editingId, setEditingId] = useState(null)



 // useEffect(() => { load() }, [])

  const save = async () => {
    if (editingId) {
      await adminService.updateStadium(editingId, form)
    } else {
      await adminService.createStadium(form)
    }
    setForm({ name: '', city: '', price: 0, cover: '' })
    setEditingId(null)
    await load()
  }

  const edit = (s) => { setEditingId(s.id); setForm({ name: s.name, city: s.city, price: s.price, cover: s.cover || '' }) }
  const remove = async (id) => { await adminService.deleteStadium(id); await load() }


  return (
    <AdminLayout>
      <div className="adm__section">
        <h2>Stadiums</h2>
        <div className="adm__grid2">
          <div className="adm__card">
            <h3>{editingId ? 'Edit Stadium' : 'Add Stadium'}</h3>
            <div className="adm__form">
              <label className="adm__field"><span>Name</span><input value={form.name} onChange={e=>setForm(f=>({ ...f, name: e.target.value }))} /></label>
              <label className="adm__field"><span>City</span><input value={form.city} onChange={e=>setForm(f=>({ ...f, city: e.target.value }))} /></label>
              <label className="adm__field"><span>Price</span><input type="number" value={form.price} onChange={e=>setForm(f=>({ ...f, price: Number(e.target.value) }))} /></label>
              <label className="adm__field"><span>Cover URL</span><input value={form.cover} onChange={e=>setForm(f=>({ ...f, cover: e.target.value }))} /></label>
              <div className="adm__row">
                <button className="adm__btn" onClick={save}>{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button className="adm__btn adm__btn--ghost" onClick={()=>{ setEditingId(null); setForm({ name:'', city:'', price:0, cover:'' }) }}>Cancel</button>}
              </div>
            </div>
          </div>

        </div>

{/**
 *         {!list ? <div className="adm__card" style={{marginTop:12}}>Loading...</div> : (
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
 * 
 */}
      </div>
    </AdminLayout>
  )
}
