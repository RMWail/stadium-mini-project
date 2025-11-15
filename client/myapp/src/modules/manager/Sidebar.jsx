import { NavLink } from 'react-router-dom'
import { FiHome, FiMapPin, FiCalendar, FiBarChart2, FiLogOut } from 'react-icons/fi'

export default function Sidebar() {
  return (
    <aside className="mgr__sidebar" style={{display:'flex', flexDirection:'column'}}>
      <div className="mgr__brand" style={{display:'flex', alignItems:'center', gap:10}}>
        <span style={{fontWeight:800}}>Stadium Manager</span>
      </div>
      <nav className="mgr__nav" style={{display:'grid', gap:16, marginTop:12}}>
        <NavLink to="/manager" end className={({isActive})=>`mgr__link ${isActive?'active':''}`}>
          <span style={{display:'inline-flex', alignItems:'center', gap:10}}>
            <FiHome/> <span>Home</span>
          </span>
        </NavLink>
        <NavLink to="/manager/mystadium" end className={({isActive})=>`mgr__link ${isActive?'active':''}`}>
          <span style={{display:'inline-flex', alignItems:'center', gap:10}}>
            <FiMapPin/> <span>Stadium</span>
          </span>
        </NavLink>
        <NavLink to="/manager/reservations" className={({isActive})=>`mgr__link ${isActive?'active':''}`}>
          <span style={{display:'inline-flex', alignItems:'center', gap:10}}>
            <FiCalendar/> <span>Reservations</span>
          </span>
        </NavLink>
        {/**
         *         <NavLink to="/manager/pricing" className={({isActive})=>`mgr__link ${isActive?'active':''}`}>
          <span style={{display:'inline-flex', alignItems:'center', gap:10}}>
            <FiTag/> <span>Pricing</span>
          </span>
        </NavLink>
         */}
        <NavLink to="/manager/statistics" className={({isActive})=>`mgr__link ${isActive?'active':''}`}>
          <span style={{display:'inline-flex', alignItems:'center', gap:10}}>
            <FiBarChart2/> <span>Statistics</span>
          </span>
        </NavLink>
      </nav>
      <nav className="mgr__navBody" style={{marginTop:'auto'}}>
        <NavLink to="/" className={({isActive})=>`mgr__link ${isActive?'active':''}`}>
          <span style={{display:'inline-flex', alignItems:'center', gap:10}}>
            <FiLogOut/> <span>Logout</span>
          </span>
        </NavLink>
      </nav>
    </aside>
  )
}
