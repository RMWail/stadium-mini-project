import {useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/pages/Profile.css'

export default function Profile() {
  const [me, setMe] = useState({ name: '', email: '' })
  const [pwd, setPwd] = useState({ current: '', next: '' })

 /** useEffect(() => { getMe().then(setMe) }, []) */

  const save = async (e) => { e.preventDefault(); /**await updateMe(me) */;
    
    alert('Saved') 
  
  }
  const updatePwd = async (e) => { e.preventDefault(); /**await changePassword(pwd) */; alert('Password changed') }

  return (
    <div className="page">
      <Navbar />
      <main className="container profile">
        <section>
          <h2>Personal info</h2>
          <form className="profile__form" onSubmit={save}>
            <input value={me.name} onChange={e=>setMe({...me, name: e.target.value})} placeholder="Full name" />
            <input value={me.email} onChange={e=>setMe({...me, email: e.target.value})} placeholder="Email" />
            <input type="password" value={pwd.current} onChange={e=>setPwd({...pwd, current: e.target.value})} placeholder="assword" />
            <button type="submit">Save</button>
          </form>
        </section>
        <section>
          <h2>Change password</h2>
          <form className="profile__form" onSubmit={updatePwd}>
            <input type="password" value={pwd.current} onChange={e=>setPwd({...pwd, current: e.target.value})} placeholder="Current password" />
            <input type="password" value={pwd.next} onChange={e=>setPwd({...pwd, next: e.target.value})} placeholder="New password" />
            <button type="submit">Update</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}
