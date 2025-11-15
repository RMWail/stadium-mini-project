import { useState,useRef,useEffect } from 'react'
import ManagerLayout from '../Layout'
import { useManager } from '../../../application/hooks/managers/useManager';
import { confirmAction } from '../../../utility/sweetalert';
import { toast } from 'sonner';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

export default function Reservations() {
  const socketRef = useRef('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
 const { reservations, reservationsLoading, reservationsError, updateReservation } = useManager();
 const queryClient = useQueryClient();
    useEffect(()=>{
    
    socketRef.current = io(`${apiUrl}`,{
      auth:{secret:'this is from Reservations component'},
      query: {data:'reservations.jsx'}
    })

    socketRef.current.on('newReservationAdded',newReservation=>{
     
      console.log('newReservation : ',newReservation);
          /**
           *  toast.info(`Nouvelle réservation par ${newReservation.username}`,{
        position:'bottom-left',
        duration:5000,
        className: "toastClass",
      })
      
           */
     
       const now = new Date();
       const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
     //  if(newAppointment.reservation_Date==today) {
        console.log('new Appointement has reached Appointments');

        queryClient.setQueryData(['allReservations'],(oldReservations)=>{
          if(!Array.isArray(oldReservations)) return [newReservation];
          return [...oldReservations,newReservation];
         })
    //   }
      
    })

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  },[])

  

  if (reservationsLoading) return <div>Loading...</div>
  if (reservationsError) return <div>Error: {reservationsError.message}</div>

 
const filteredReservations = reservations
  ?.filter(r =>
    status === '' || r.status.toString() === status
  )
  .filter(r => {
    const s = search.toLowerCase();
    return (
      r.username.toLowerCase().includes(s) ||
      r.date.toLowerCase().includes(s)
    );
  });


    const handleAction = (id,newStatus) => {
       console.log('id : ',id,' status : ',newStatus);
  
       if(newStatus ==-1) {
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
        <h2>Reservations</h2>

        {/* Toolbar */}
        <div className="mgr__toolbar">
          {/* Search bar */}

          <input
            type="text"
            placeholder="Search by username or type a date"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "10px 15px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "50%"
            }}
          />

          {/* Status Filter */}
          <select value={status} onChange={e => setStatus(e.target.value)} style={{marginTop: "10px"}}>
            <option value="">All</option>
            <option value="0">On queue</option>
            <option value="1">Confirmed</option>
            <option value="-1">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        {!filteredReservations || filteredReservations.length === 0 ? (
          <div className="mgr__card">No reservations found.</div>
        ) : (
          <div className="mgr__table">
            <div className="mgr__thead">
              <div>ID</div>
              <div>Username</div>
              <div>Phone number</div>
              <div>Date</div>
              <div>Hour</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {filteredReservations.map((r, index) => (
              <div key={r.idreservation} className="mgr__trow">
                <div>{index + 1}</div>
                <div>{r.username}</div>
                <div>{r.phoneNumber}</div>
                <div>{r.date}</div>
                <div>{r.hour}</div>
                <div>
                  <span className={`mgr__status mgr__status--${r.status}`}>
                    {r.status === 0
                      ? 'On queue'
                      : r.status === 1
                      ? 'Completed'
                      : r.status === -1
                      ? 'Cancelled'
                      : 'Unknown'}
                  </span>
                </div>

                <div>
                  <button
                      style={{ color: 'red' }}
                      onClick={() => handleAction(r.idreservation,-1)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ marginLeft: '5px', color: 'green' }}
                    onClick={() => handleAction(r.idreservation,1)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ManagerLayout>
  )
}
