import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/pages/StadiumDetails.css'
import { useStadium } from '../application/hooks/stadiums/useStadium'

export default function StadiumDetails() {
  const { id } = useParams()
  console.log("id = ",id);
  const [stadium, setStadium] = useState(null)

  const {getStadiumById,loading,error} = useStadium();
      
  useEffect(() => {
   // const stad = ;
   // console.log("stad :"+stad);
    setStadium(getStadiumById(id));
  }, [id])

  if (!stadium) return null

  //console.log('stadium name : ',myStadium.name);
  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <div className="stadium-details">
          <img className="stadium-details__cover"  src={`data:image/png;base64,${stadium.picture}`} alt={stadium.name} />
          <div className="stadium-details__info">
            <h1>{stadium.name}</h1>
            <p>{stadium.city} •{/* ⭐ {stadium.rating} */}• Da{stadium.price}/h</p>
            {/** <p>{myStadium.description}</p> */}
            {/**<Link className="stadium-details__reserve" to={`/stadiums/${stadium.name}/reserve`}>Reserve</Link> */}
            <Link className="stadium-details__reserve" to={`/stadiums/reserve`}>Reserve</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
