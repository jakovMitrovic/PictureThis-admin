import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cross_icon.png'

const ListProduct = () => {


  const [products, setProducts] = useState([])
  const [del, setDel] = useState(false)
  const [delID, setDelID] = useState('')



  const fetchProducts = async () => {
    await fetch('http://localhost:4000/products/allProducts')
      .then((res) => res.json())
      .then((data) => { setProducts(data) })
  }


  useEffect(() => {
    fetchProducts();
  }, [])

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:4000/products/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

    })
    setDel(!del)
    await fetchProducts();
  }


  const deletePrompt = (id) => {
    setDel(!del)
    setDelID(id)

  }

  return (
    <div className='list-product'>
      <h1>
        All Products
      </h1>
      <div className="productslist-title">
        <p></p>
        <p>Name</p>
        <p>Price</p>
        <p>Sale Price</p>
        <p>Category</p>
      </div>
      <div className="productlist-items">
        <hr />
        {products.map((product, i) => {
          return <div key={i} className='listitem'>
            <div  className="productslist-title format">
              <img src={product.image} alt="" className="product-icon" />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>{product.sale_price ? `$${product.sale_price}` : "/"}</p>
              <p>{product.category}</p>
              <img onClick={() => { deletePrompt(product._id) }} src={remove_icon} alt="" className="listproduct-remove" />
              {del &&
                (delID == product._id && <div className='del'>
                  <p>Are you sure you want to delete?</p>
                  <button onClick={() => { deleteProduct(product._id) }} alt="" className="del-btn" >Delete</button>
                  <button onClick={() => { setDel(false) }} alt="" className="cancel-btn" >Cancel</button>

                </div>)

              }
            </div>
            <hr />
          </div>
        })}
      </div>
    </div>
  )
}

export default ListProduct
