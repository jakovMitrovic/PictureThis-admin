import React, { useContext } from 'react'
import './Admin.css'
import Sidebar from '../Sidebar/Sidebar'
import { Route, Router, Routes } from 'react-router-dom'
import AddProduct from '../AddProduct/AddProduct'
import ListProduct from '../ListProduct/ListProduct'
import Login from '../Login/Login'
import { AdminContext } from '../../Context/AdminContext'
import EditProduct from '../EditProduct/EditProduct'
import AddBlogPost from '../AddBlogPost/AddBlogPost'

const Admin = () => {
  const [admin, setAdmin] = useContext(AdminContext)


  return (
    <div className='admin'>
        {admin.token !== '' && <Sidebar/>}
       

        
      
          <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/edit/:id' element={<EditProduct/>}/>
            <Route path='/addBlogPost' element={<AddBlogPost/>}/>
          </Routes>
     
    </div>
  )
}

export default Admin
