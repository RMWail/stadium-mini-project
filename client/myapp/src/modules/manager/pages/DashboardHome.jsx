import { useEffect,useRef } from 'react';
import ManagerLayout from '../Layout'
//import StadiumCard from '../../../components/StadiumCard'
import { useManager } from '../../../application/hooks/managers/useManager'
import { StatusBadge } from './StatusBadge';
import { confirmAction } from '../../../utility/sweetalert';
import { useQueryClient } from '@tanstack/react-query';
import io from 'socket.io-client';
import { toast } from 'sonner';
export default function DashboardHome() {
  const queryClient = useQueryClient();
  const socketRef = useRef('');
  const {todayReservations,todayReservationsLoading,todayReservationsError,updateReservation} = useManager();
  const apiUrl = import.meta.env.VITE_API_URL;    
 
  
    useEffect(()=>{
    
    socketRef.current = io(`${apiUrl}`,{
      auth:{secret:'this is from DashboardHome component'},
      query: {data:'reservations.jsx'}
    })

    socketRef.current.on('newReservationAdded',newReservation=>{
     console.log('Reservation in socket :',newReservation);
   
      toast.info(`New Reservation was made by ${newReservation.username}`,{
        position:'bottom-left',
        duration:6000,
        className: "toastClass",
      })
      
       const now = new Date();
       const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
       if(newReservation.date==today) {
        console.log('new Appointement has reached Appointments');

        queryClient.setQueryData(['todayReservations'],(oldReservations)=>{
          if(!Array.isArray(oldReservations)) return [newReservation];
          return [...oldReservations,newReservation];
         })
       }
      
    })

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  },[])


  const handleAction = (id,newStatus) => {
   //  console.log('id : ',id,' status : ',newStatus);

     if(newStatus ==0) {
        confirmAction('Do you really want to set this reservation as cancelled').then(async(res)=>{
          if(res.isConfirmed){
              await updateReservation(id,newStatus);
          }
        })
     }
     else {
       confirmAction('Do you really want to set this reservation as confirmed').then(async(res)=>{
          if(res.isConfirmed){
                await updateReservation(id,newStatus);
          }
        })
     }
  }
 

  return (
    <ManagerLayout>
      <div className="mgr__section">
        <h2>Today's Reservations</h2>
        {todayReservationsLoading && (<div className="mgr__card">Loading...</div>)}
        {todayReservationsError && (<div className="mgr__card">Error loading reservations.</div>)}
        {!todayReservationsLoading && !todayReservationsError && (
          !todayReservations || todayReservations.length === 0 ? (
            <div className="mgr__card">No reservations today.</div>
          ) : (
            <div className="mgr__table">
              <div className="mgr__thead" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr' }}>
                <div>client username</div>
                <div>Phone Number</div>
                <div>Hour</div>
                <div>Date</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {todayReservations.map((r, index) => (
                <div key={r.idreservation ?? index} className="mgr__trow" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr' }}>
                  <div>{r.username}</div>
                  <div>{r.phoneNumber}</div>
                  <div>{r.hour}</div>
                  <div>{r.date}</div>
                  <div><StatusBadge status={r.status} /></div>
                  <div>
                    <button style={{ color: 'red' }} onClick={()=>handleAction(r.idreservation,-1)}>Cancel</button>
                    <button style={{ marginLeft: '8px', color: 'green' }} onClick={()=>handleAction(r.idreservation,1)}>Confirm</button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      

    </ManagerLayout>
  )
}


/**{myStadium ? <MyStadiumCard key={myStadium.idstadium} stadium={myStadium} /> : null} */
