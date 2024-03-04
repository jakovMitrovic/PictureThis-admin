import React, { useContext, useState } from 'react'
import './Login.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../Context/AdminContext'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [admin, setAdmin] = useContext(AdminContext)

    const login = async(e) =>{
        e.preventDefault()
        const admin = {
            username: username,
            password: password
        }

        try {
            await fetch('http://localhost:4000/admins/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(admin),
            }).then((res) => res.json()).then((data) => {
                if (data.message === "ok") {
                    alert('Welcome!')

                    setAdmin({ token: data.token, username: data.username, _id:data._id })

                    navigate('/')
                } else {
                    alert(data.message)
                }
            })
        } catch (error) {
            alert(error)
        }
    }

  return (
    <div className='login_container'>
        <form className='login_inputs' onSubmit={login}>
            <h1>Log In</h1>
            <input type='text' placeholder='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type='text' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button>Log In</button>
        </form>
    </div>
  )
}

export default Login
