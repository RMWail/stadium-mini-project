import { useState } from 'react'
import Footer from '../components/Footer'
import { useClient } from '../application/hooks/clients/useClient'
import '../styles/pages/Auth.css'
import { isValidUsername,isValidEmail,isValidTelephone } from '../utility/formValidation'
import { confirmAction } from '../utility/sweetalert'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', phoneNumber: '', password: '', confirm_password: '' })
  const { register } = useClient();
  const [errors,setErrors] = useState([]);

  const submit = async (e) => {
    e.preventDefault()

     const validationErrors = {};

     if(!isValidUsername(form.username)){
      validationErrors.username = 'Invalid username';
     }

     if(!isValidEmail(form.email)){
      validationErrors.email = 'Invalid email';
     }
     if(!isValidTelephone(form.phoneNumber)){
      validationErrors.phoneNumber = 'Invalid phone number';
     }

     if(form.password.length < 6){
      validationErrors.password = 'Password must be at least 6 characters';
     }

     if(form.password !== form.confirm_password){
      validationErrors.confirm_password = 'Passwords do not match';
     }
   
     setErrors(validationErrors);

    if(Object.keys(validationErrors).length == 0){
       confirmAction('Are you sure you want to register?','This action cannot be undone','warning').then(async(result)=>{
        if(result.isConfirmed){
       const res = await register(form)
        console.log("response in UI : ",res);
        }
       })
    }
  }

  return (
    <div className="page">
      <main className="auth">
        <form className="auth__form" onSubmit={submit}>
          <h2>Create account</h2>
          <input placeholder="Username" value={form.username} onChange={e=>setForm({ ...form, username: e.target.value })} />
          {errors?.username && <span style={{color:'red'}}>{errors.username}</span>}
          <input placeholder="Email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} />
          {errors?.email && <span style={{color:'red'}}>{errors.email}</span>}
          <input placeholder="Phone Number" value={form.phoneNumber} onChange={e=>setForm({ ...form, phoneNumber: e.target.value })} />
          {errors?.phoneNumber && <span style={{color:'red'}}>{errors.phoneNumber}</span>}
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({ ...form, password: e.target.value })} />
          {errors?.password && <span style={{color:'red'}}>{errors.password}</span>}
          <input placeholder="Confirm password" type="password" value={form.confirm_password} onChange={e=>setForm({ ...form, confirm_password: e.target.value })} />
          {errors?.confirm_password && <span style={{color:'red'}}>{errors.confirm_password}</span>}
          <button type="submit">Register</button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
