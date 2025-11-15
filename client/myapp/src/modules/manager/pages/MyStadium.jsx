import {  useState } from 'react'
import { wilayas } from '../../../application/data/wilaya'
import ManagerLayout from '../Layout'
import { isValidString,isValidTelephone } from '../../../utility/formValidation'
import { confirmAction } from '../../../utility/sweetalert';
import { useManager } from '../../../application/hooks/managers/useManager';
//import MyStadiumCard from '../../../components/MyStadiumCard';

export default function Stadiums() {
  const [stadium, setStadium] = useState({ name: '', city: '',address:'',phoneNumber:'',price: 0, stadiumPicture: '' })
  const [errors,setErrors] = useState([]);
  const {myStadium,saveStadiumInfo} = useManager();
  const [slot, setSlot] = useState({ start: '', end: '' })
  const [slots, setSlots] = useState([])
  const [isModalOpen,setIsModalOpen] = useState(false);

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

console.log('mystad ',myStadium);

  

  const openModal = ()=>{
    setStadium({
      idstadium: myStadium?.idstadium,
      name: myStadium?.name || '',
      city: myStadium?.city || '',
      address: myStadium?.address || '',
      phoneNumber: myStadium?.phoneNumber || myStadium?.telephone || '',
      price: myStadium?.price || 0,
      stadiumPicture: ''
    });
    setSlots(stringSlotsToObjects(myStadium?.schedualTiming));
    setSlot({start:'',end:''});
    setErrors([]);
    setIsModalOpen(true);
  }

  const handleFileChange = (e) => {
    setStadium((prevData) => ({
      ...prevData,
      stadiumPicture: e.target.files[0],
    }));
  };

  const addSlot = () => {
    if(!slot.start || !slot.end) return;
    setSlots(prev => {
      if(prev.some(s => s.start === slot.start && s.end === slot.end)) return prev;
      return [...prev, { start: slot.start, end: slot.end }];
    });
    setSlot({ start: '', end: '' });
  }

  const removeSlot = (index) => {
    setSlots(prev => prev.filter((_, i) => i !== index));
  }

  const save = async () => {
    const validationErrors = {};

    if(!isValidString(stadium.name)){
        validationErrors.name = 'Invalid stadium name';
    }
    if(stadium.city==''){
        validationErrors.city = 'Invalid city';
    }
    if(stadium.address==''){
        validationErrors.address = 'Invalid address';
    }
    if(!isValidTelephone(stadium.phoneNumber)){
        validationErrors.phoneNumber = 'Invalid phone number';
    }
    if(stadium.price==0){
        validationErrors.price = 'Invalid price';
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length==0){
       const formData = new FormData();
            formData.append('idstadium',stadium.idstadium);
            formData.append('name', stadium.name);
            formData.append('city', stadium.city);
            formData.append('address', stadium.address);
            formData.append('phoneNumber', stadium.phoneNumber);
            formData.append('price', stadium.price);
            formData.append('schedualTiming', slotsToString(slots));
            if(stadium.stadiumPicture){
              formData.append('stadiumPicture', stadium.stadiumPicture);
            }

            confirmAction('Save changes to your stadium?','This action cannot be undone','warning').then(async(result)=>{
            if(result.isConfirmed){
              const res = await saveStadiumInfo(formData);
              if(res.status==200){
                setIsModalOpen(false);
              }
            }
          })
    }
  }

  const ScheduleChips = ({schedual})=>{
    const list = stringSlotsToObjects(schedual);
    if(list.length===0) return <span style={{color:'#667085'}}>No hours set</span>;
    return (
      <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
        {list.map((s,i)=> (
          <span key={`${s.start}-${s.end}-${i}`} style={{background:'#F2F4F7',border:'1px solid #E4E7EC',color:'#344054',padding:'4px 10px',borderRadius:999,fontSize:12}}>{s.start} - {s.end}</span>
        ))}
      </div>
    )
  }

  return (
    <ManagerLayout>
      <div className="adm__section">
        <h2>My Stadium</h2>
        <div className="adm__card" style={{padding:0, overflow:'hidden'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr', gap:0}}
               className="stadium-card">
            <div style={{position:'relative', width:'100%', background:'#0a0a0a'}}>
              {myStadium?.picture ? (
                <img
                  src={`data:image/png;base64,${myStadium.picture}`}
                  alt={myStadium?.name || 'Stadium'}
                  style={{width:'100%', height: '280px', objectFit:'cover', opacity:0.95}}
                />
              ) : (
                <div style={{height:'280px',display:'flex',alignItems:'center',justifyContent:'center',color:'#98A2B3'}}>No image</div>
              )}
              <div style={{position:'absolute',bottom:12,left:12, background:'rgba(17,24,39,.7)', color:'white', padding:'8px 12px', borderRadius:8}}>
                <div style={{fontWeight:700,fontSize:18}}>{myStadium?.name || 'Unnamed Stadium'}</div>
                <div style={{fontSize:12,opacity:.9}}>{myStadium?.city || '-'}</div>
              </div>
            </div>

            <div style={{padding:'20px', display:'grid', gap:'14px'}}>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'12px'}}>
                <InfoItem label="Address" value={myStadium?.address || '-'} />
                <InfoItem label="Telephone" value={myStadium?.phoneNumber || myStadium?.telephone || '-'} />
                <InfoItem label="City" value={myStadium?.city || '-'} />
                <InfoItem label="Price per hour" value={myStadium?.price ? `${myStadium.price} DA` : '-'} />
              </div>
              <div>
                <div style={{fontSize:12,color:'#667085',marginBottom:6}}>Available hours</div>
                <ScheduleChips schedual={myStadium?.schedualTiming} />
              </div>
              <div style={{display:'flex',justifyContent:'flex-end'}}>
                <button className="adm__btn" onClick={openModal}>Modify</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={{position:'fixed', inset:0, background:'rgba(2,6,23,.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50}}>
          <div style={{width:'min(920px,92vw)', background:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(2,6,23,.35)'}}>
            <div style={{padding:'18px 22px', borderBottom:'1px solid #EEF2F6', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3 style={{margin:0}}>Edit Stadium</h3>
              <button onClick={()=>setIsModalOpen(false)} style={{background:'transparent', border:'none', fontSize:20, cursor:'pointer'}}>×</button>
            </div>
            <div style={{padding:'20px', display:'grid', gap:'14px'}}>
              <div className="adm__stadium" style={{display:'grid', gap:12}}>
                <label className="adm__field">
                  <span>Name</span>
                  <input value={stadium.name} onChange={e=>setStadium(f=>({ ...f, name: e.target.value }))} />
                  {errors?.name && <span style={{color:'red'}}>{errors.name}</span>}
                </label>
                <label className="adm__field">
                  <span>City</span>
                  <select value={stadium.city} onChange={e=>setStadium(f=>({ ...f, city: e.target.value }))}>
                    <option value="">Select wilaya</option>
                    {wilayas.map((w,index)=>(
                      <option key={index} value={w}>{w}</option>
                    ))}
                  </select>
                  {errors?.city && <span style={{color:'red'}}>{errors.city}</span>}
                </label>
                <label className="adm__field">
                  <span>Address</span>
                  <input value={stadium.address} onChange={e=>setStadium(f=>({ ...f, address: e.target.value }))} />
                  {errors?.address && <span style={{color:'red'}}>{errors.address}</span>}
                </label>
                <label className="adm__field">
                  <span>Phone number</span>
                  <input value={stadium.phoneNumber} onChange={e=>setStadium(f=>({ ...f, phoneNumber: e.target.value }))} />
                  {errors?.phoneNumber && <span style={{color:'red'}}>{errors.phoneNumber}</span>}
                </label>
                <label className="adm__field">
                  <span>Price per hour</span>
                  <input type="number" value={stadium.price} onChange={e=>setStadium(f=>({ ...f, price: Number(e.target.value) }))} />
                  {errors?.price && <span style={{color:'red'}}>{errors.price}</span>}
                </label>

                <label className="adm__field">
                  <span>Available hours</span>
                  <div className="adm__row" style={{ gap: '8px', alignItems: 'center' }}>
                    <input type="time" value={slot.start} onChange={e=>setSlot(s=>({ ...s, start: e.target.value }))} />
                    <span style={{ padding: '0 4px' }}>to</span>
                    <input type="time" value={slot.end} onChange={e=>setSlot(s=>({ ...s, end: e.target.value }))} />
                    <button type="button" className="adm__btn" onClick={addSlot} disabled={!slot.start || !slot.end}>Add slot</button>
                  </div>
                  {slots.length>0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {slots.map((s, idx) => (
                        <div key={`${s.start}-${s.end}-${idx}`} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '16px', padding: '4px 8px' }}>
                          <span>{s.start} - {s.end}</span>
                          <button type="button" onClick={()=>removeSlot(idx)} style={{ marginLeft: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#c00', fontWeight: 600 }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </label>

                <label className="adm__field">
                  <span>Stadium Picture</span>
                  <input type="file" name='stadiumPicture' onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
            </div>
            <div style={{padding:'16px 20px', borderTop:'1px solid #EEF2F6', display:'flex', justifyContent:'flex-end', gap:10}}>
              <button className="adm__btn adm__btn--ghost" onClick={()=>setIsModalOpen(false)}>Cancel</button>
              <button className="adm__btn" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </ManagerLayout>
  )
}

function InfoItem({label, value}){
  return (
    <div style={{border:'1px solid #EAECF0', borderRadius:12, padding:'12px 14px'}}>
      <div style={{fontSize:12, color:'#667085', marginBottom:4}}>{label}</div>
      <div style={{fontWeight:600, color:'#101828'}}>{value}</div>
    </div>
  )
}










/** const parseSchedualToSlots = (str)=>{
    if(!str) return [];
    return String(str)
      .split('|')
      .filter(Boolean)
      .map(s=>{
        const [start,end] = s.split('-');
        return {start,end};
      })
      .filter(s=>s.start && s.end);
  } */
