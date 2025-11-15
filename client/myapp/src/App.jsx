import './App.css'
import { useRef,useEffect } from 'react'
import { Routes, Route,Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Reservation from './pages/Reservation'
import MyReservations from './pages/MyReservations'
import Profile from './pages/Profile'
import DashboardHome from './modules/manager/pages/DashboardHome'
import ScheduleAvailability from './modules/manager/pages/ScheduleAvailability'
import Reservations from './modules/manager/pages/Reservations'
//import Pricing from './modules/manager/pages/Pricing'
import AdminHome from './modules/admin/pages/AdminHome'
import AdminStadiums from './modules/admin/pages/Stadiums'
import AdminReservations from './modules/admin/pages/Reservations'
import AssignManager from './modules/admin/pages/AssignManager'
import MyStadium from './modules/manager/pages/MyStadium'
import Statistics from './modules/manager/pages/Statistics'
import io from 'socket.io-client';
function App() {

 const socketRef = useRef('');
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    socketRef.current = io(`${apiUrl}`, {
      auth: {secret: 'this is socket io in clinic project'},
      query: {data: 20033008}
    })
  }, []);

  return (             
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/**      <Route path="/stadiums" element={<RequireAuth><StadiumList /></RequireAuth>} />
      <Route path="/stadiums/:id" element={<StadiumDetails /> } /> */}
      <Route path="/stadiums/reserve" element={<Reservation />} />
      <Route path="/reservations" element={/*<RequireAuth>*/<MyReservations />/**</RequireAuth> */} />
      <Route path="/profile" element={/*<RequireAuth>*/<Profile />/**</RequireAuth> */} />
      <Route path="/manager" element={/*<RequireRole role="manager">*/<DashboardHome />/**</RequireRole> */} />
      <Route path="/manager/mystadium" element={/*<RequireRole role="manager">*/<MyStadium />/**</RequireRole> */} />
      <Route path="/manager/schedule" element={/*<RequireRole role="manager">*/<ScheduleAvailability />/**</RequireRole> */} />
      <Route path="/manager/reservations" element={/*<RequireRole role="manager">*/<Reservations />/**</RequireRole> */} />
      {/**<Route path="/manager/pricing" element={<RequireRole role="manager"><Pricing /></RequireRole>} /> */}
      <Route path="/manager/statistics" element={/*<RequireRole role="manager">*/<Statistics />/**</RequireRole> */} />
      <Route path="/admin" element={/*<RequireRole role="admin">*/<AdminHome />/**</RequireRole> */} />
      <Route path="/admin/stadiums" element={/*<RequireRole role="admin">*/<AdminStadiums />/**</RequireRole> */} />
      <Route path="/admin/manager" element={/*<RequireRole role="admin">*/<AssignManager />/**</RequireRole> */} />
      <Route path="/admin/reservations" element={/*<RequireRole role="admin">*/<AdminReservations />/**</RequireRole> */} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
} 

export default App

{/*<RequireAuth> */}
 {/*</RequireAuth> */}
/**
 * 
 * {/*<RequireAuth> */ {/**</RequireAuth> */}
 