import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../Context/AdminContext'


const Navbar = () => {

   const [admin, setAdmin] = useContext(AdminContext)

   const navigate = useNavigate()

  return (
    <div className='navbar'>
    <div className='nav-logo-container'>
      <img src={logo} alt="" className="nav-logo" />
        <h2>Picture This</h2>
    </div>
    {admin.token === '' ? 
      (<Link className='login_btn' to={'/login'}>Log In</Link>) :

      (<button className='logout_btn' onClick={()=>{setAdmin({token:''}); navigate('/login')}}>Log Out</button>)
    }

      
    </div>
  )
}

export default Navbar
