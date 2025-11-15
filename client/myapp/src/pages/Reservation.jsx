import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/pages/Reservation.css'
import { useStadium } from '../application/hooks/stadiums/useStadium'
import { confirmAction } from '../utility/sweetalert'
import { useManager } from '../application/hooks/managers/useManager'
import jspdf from 'jspdf';

export default function Reservation() {
  const {createReservation} = useStadium();
  const {myStadium} = useManager();       
  //const [stadium, setStadium] = useState(null)
  const [date, setDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState('')


  
  const slotsToString = (arr) => {
    if(!Array.isArray(arr) || arr.length === 0) return '';
    return arr.map(s => `${s.start}-${s.end}`).join('|');
  }

  function stringSlotsToObjects(slots) {
  if (!Array.isArray(slots)) return [];

  return slots.map(str => {
    const [start, end] = str.split('-').map(s => s.trim());
    return { start, end };
  });
}

  
useEffect(() => {
  if (myStadium?.schedualTiming) {
    setAvailableSlots(stringSlotsToObjects(myStadium.schedualTiming));
  //  console.log('available ')
  }
}, [myStadium]);



  const emptyReservation = ()=>{
    setDate('');
    setSelectedSlot('');
  }

  const submit = async () => {
    if (!date || !selectedSlot) return

    const username = sessionStorage.getItem('usernameClient');
    const phoneNumber = sessionStorage.getItem('phoneNumberClient');
    
    const hour = slotsToString([selectedSlot]);
    console.log('hour : ',hour);

    const reservation = {
      username,
      phoneNumber,
      date,
      hour: hour
    }

    
        
     

    confirmAction('Are you sure you want to reserve the stadium in this time?','Do you really want to confirm reservation,This action cannot be undone','warning').then(async(result)=>{
        if(result.isConfirmed){
       const res = await createReservation(reservation)
       console.log('res : ',res);
       if(res.data.success==1){
            const now = new Date(Date.now());
             const reservationOnlineDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}:${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const doc = new jspdf();

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 15;

  doc.setFontSize(24);
  const title = "Reservation Ticket";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2; // centered

  doc.text(title, titleX, 20);

  doc.setFontSize(12);
  doc.text(`Online Reservation Date: ${reservationOnlineDate}`, marginX, 40);


  doc.setFontSize(15);
  const username = sessionStorage.getItem("usernameClient") ?? "Unknown";
  const phoneNumber = sessionStorage.getItem("phoneNumberClient") ?? "Unknown";
  doc.text(`Username : ${username}`, marginX, 55);
  doc.text(`Phone Number : ${phoneNumber}`, marginX, 65);
  doc.text(`Date     : ${date}`, marginX, 75);
  doc.text(`Hour     : ${hour}`, marginX, 85);


  doc.setFontSize(14);
//  doc.setTextColor(102, 102, 102);
  doc.text("Thank you for your reservation!", 130, 120);


  doc.setTextColor(0, 0, 0); 
  doc.setDrawColor("black");
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, 280);


  doc.save("reservation.pdf");
             emptyReservation();
       }
 
        }
       })
   
  }

  if (!myStadium) return null

  return (
    <div className="page">
      <Navbar />
      <main className="container" style={{ position: 'relative', padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', minHeight: '70vh', borderRadius: '12px', overflow: 'hidden' }}>
          <img src={`data:image/png;base64,${myStadium.picture}`} alt={myStadium.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
            <h1 style={{ color: '#fff', marginTop: 0, marginBottom: '16px' }}>Reserve: {myStadium.name}</h1>
            <div style={{ display: 'grid', gap: '12px', maxWidth: '520px' }}>
              <label style={{ display: 'grid', gap: 6, color: '#fff' }}>
                <span>Day</span>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
              </label>
              <div style={{ display: 'grid', gap: 6 }}>
                <span style={{ color: '#fff' }}>Available hours</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {availableSlots.length === 0 && (
                    <span style={{ color: '#fff' }}>No available hours.</span>
                  )}
                  {availableSlots.map((slot) => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot.start + "-" + slot.end}
                        type="button"
                        className={`adm__btn ${active ? '' : 'adm__btn--ghost'}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot.start + "-" + slot.end}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <button className="reservation__confirm" disabled={!date || !selectedSlot} onClick={submit}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

