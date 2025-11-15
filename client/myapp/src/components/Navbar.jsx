import { Link, useNavigate } from 'react-router-dom'

import '../styles/components/Navbar.css'

export default function Navbar() {
   //const { isAuthenticated } = useAuth()


  const navigate = useNavigate()

  return (
    <header className="navbar">
      <div className="navbar__brand"><Link to="/">StadiumReserve</Link></div>
      <nav className="navbar__nav">
    {/*    {isAuthenticated ? ( */}
          <>
            <Link to="/stadiums/reserve">Stadium</Link>
            <Link to="/reservations">My Reservations</Link>
            {/**<Link to="/profile">Profile</Link> */}
            <button className="navbar__btn" onClick={()=>{ sessionStorage.removeItem('usernameClient'); 
              sessionStorage.removeItem('usernameManager');
              navigate('/') }}>Logout</button>
          </>
     {   /**)  */ }
        {/**
          : (
          <>
            <Link to="/login" className="navbar__cta">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )} */}
      </nav>
    </header>
  )
}
