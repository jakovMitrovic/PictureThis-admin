import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'


const Navbar = () => {
  return (
    <div className='navbar'>
    <div className='nav-logo-container'>
      <img src={logo} alt="" className="nav-logo" />
        <h2>Picture This</h2>
    </div>

      
    </div>
  )
}

export default Navbar
