import {useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import StadiumCard from '../components/StadiumCard'
import '../styles/pages/StadiumList.css'
import {useStadium} from '../application/hooks/stadiums/useStadium';

export default function StadiumList() {
  const [filters, setFilters] = useState({ city: '', price: '', time: '' })
 // const [stadiums, setStadiums] = useState([])
  const {stadiums,loading,error} = useStadium();

 //console.log("stadiums : ",stadiums);

/**
 * 
   useEffect(() => {
    listStadiums(filters).then(setStadiums)
  }, [filters])
 */

  const onChange = (patch) => setFilters(prev => ({ ...prev, ...patch }))

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <h1>Stadiums</h1>
        <Filters {...filters} onChange={onChange} />
        <div className="grid">
          {stadiums && stadiums.map((stadium) => <StadiumCard key={stadium.idstadium} stadium={stadium} />)}
        </div>
      </main>
      <Footer />
    </div>
  )
}
