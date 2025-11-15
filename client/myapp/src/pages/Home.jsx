import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import StadiumCard from '../components/StadiumCard'
//import { getFeaturedStadiums } from '../application/services/stadiumService'
import '../styles/pages/Home.css'
import stad1 from './photos/stad1.jpg'
import stad2 from './photos/stad2.jpg'
import stad3 from './photos/stad3.jpg'
import { Link } from 'react-router-dom'

export default function Home() {
  const [q, setQ] = useState('')
  const [stadiums, setStadiums] = useState([])
//  const { isAuthenticated } = useAuth()

  const slides = [stad1, stad2, stad3]
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

/**  useEffect(() => {
    getFeaturedStadiums().then(setStadiums)
  }, [])
 */
  return (
    <div className="page home-bg">
      {/** <Navbar /> */}
      <main>
        <section
          className="hero hero--home"
          style={{
            backgroundImage: `url(${slides[slideIndex]})`
          }}
        >
          <div className="hero__actions">
            <Link className="btn btn--outline" to="/login">Login</Link>
            <Link className="btn" to="/register">Register</Link>
          </div>
          <div className="hero__content container">
            <h1>Book football stadiums by the hour</h1>
            <p>Find the best pitches near you. Reserve instantly.</p>
           {/** <SearchBar value={q} onChange={setQ} onSubmit={()=>{}} /> */}
            <div className="hero__ctas">
           {/**
            * 
            * 
            */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
