import { NavLink } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <aside className="adm__sidebar">
      <div className="adm__brand">Platform Admin</div>
      <nav className="adm__nav">
        <NavLink to="/admin" end className={({isActive})=>`adm__link ${isActive?'active':''}`}>Home</NavLink>
        <NavLink to="/admin/stadiums" className={({isActive})=>`adm__link ${isActive?'active':''}`}>Stadiums</NavLink>
        <NavLink to="/admin/manager" className={({isActive})=>`adm__link ${isActive?'active':''}`}>Assign manager</NavLink>
        <NavLink to="/admin/reservations" className={({isActive})=>`adm__link ${isActive?'active':''}`}>Reservations</NavLink>
        <NavLink to="/" className={({isActive})=>`adm__link ${isActive?'active':''}`}>logout</NavLink>
      </nav>
    </aside>
  )
}
