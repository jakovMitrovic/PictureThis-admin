import React, { useContext } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Components/Admin/Admin'
import { AdminContext } from './Context/AdminContext'
import Login from './Components/Login/Login'

const App = () => {

  const [admin, setAdmin] = useContext(AdminContext)

  return (



    <div>
      <Navbar/>
      <Admin/>
      
    </div>
  )
}

export default App
