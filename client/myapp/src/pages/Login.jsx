import { useState } from 'react'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/Auth.css'
import { Link } from 'react-router-dom'
import { useLogin } from '../application/hooks/useLogin'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})   // FIXED

  const { login } = useLogin()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    const validationErrors = {}

    // FIXED CONDITIONS
    if (username.trim() === '') {
      validationErrors.username = 'Username is required'
    }

    if (password.trim() === '') {
      validationErrors.password = 'Password is required'
    }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const res = await login({ username, password })
      console.log("res in component : ",res)

        if(res?.response?.data?.message =='negative'){
           setErrors({ username: 'Wrong username or password' })
        }

    }
  }

  return (
    <div className="page">
      <main className="auth">
        <form className="auth__form" onSubmit={submit}>
          <h2>Sign in</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <div style={{color:'red'}}>{errors.username && <span>{errors.username}</span>}</div>

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div style={{color:'red'}}>{errors.password && <span >{errors.password}</span>}</div>

          <button type="submit">Login</button>

          <h4>Don't have an account? <Link to="/register">Register</Link></h4>
        </form>
      </main>
      <Footer />
    </div>
  )
}
