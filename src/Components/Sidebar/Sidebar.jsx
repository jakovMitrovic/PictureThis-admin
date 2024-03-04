import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addProduct from '../../assets/add-file.png'
import listProduct from '../../assets/list.png'
import addBlog from '../../assets/blog.png'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link className='link' to={'/addproduct'}>
                <div className="sidebar-item">
                    <img src={addProduct} alt='' />
                    <p>Add product</p>
                </div>
            </Link>

            <Link className='link' to={'/listproduct'}>
                <div className="sidebar-item">
                    <img src={listProduct} alt='' />
                    <p>Product List</p>
                </div>
            </Link>

            <Link className='link' to={'/addBlogPost'}>
                <div className="sidebar-item">
                    <img src={addBlog} alt='' />
                    <p>Add Blog Post</p>
                </div>
            </Link>

        </div>
    )
}

export default Sidebar
