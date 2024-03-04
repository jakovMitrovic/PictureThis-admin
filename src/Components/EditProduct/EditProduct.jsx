import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EditProducts.css'
import upload from '../../assets/upload_area.svg'
import { AdminContext } from '../../Context/AdminContext'

const EditProduct = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [image, setImage] = useState(false)
    const [admin, setAdmin] = useContext(AdminContext)

    const navigate = useNavigate()

    const imageHandler = (e) => {
        setImage(e.target.files[0])
      
    }
    
    const edit = async(e) =>{
        e.preventDefault()
        
        let responseData;
        console.log(admin.token)
        let formData = new FormData();
        if(image !== false){
            console.log(image)
            formData.append('product', image);
            await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',

                },
                body: formData,
            }).then((res) => res.json()).then((data) => { responseData = data })
        }else{
            responseData = {
                success:true,
                image_url:product.image
            }
        }

       

        if (responseData.success) {
            product.image = responseData.image_url;
  

            await fetch('http://localhost:4000/products/edit', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': admin.token
                },
                body: JSON.stringify(product),
            }).then((res) => res.json()).then((data) => {
                data.success ? alert(`Edited!`) : alert('Error')
            })


            product.image = responseData.image_url

        }

        navigate('/listproduct')
    }
    
    
    useEffect(() => {
        
        fetch(`http://localhost:4000/products/product/${id}`)
        .then((res) => res.json())
        .then((data) => { setProduct(data);})
    }, [])

    return (
        <form className='add-product' onSubmit={(e)=>edit(e)}>
            <h1>Edit</h1>
            <div className='edit_grupation'>

            <div className="addproduct-input">
                <p>Product name</p>
                <input value={product.name} type='text' onChange={(e) => { setProduct({...product, name: e.target.value}) }} />
            </div>
            <div className="addproduct-input">
                <p>Price</p>
                <input value={product.price} type='number'  onChange={(e) => { setProduct({...product, price: e.target.value}) }} />
            </div>
            </div>
            <div className='edit_grupation'>

            <div className="addproduct-input">
                <p>Sale price</p>
                <input value={product?.sale_price} type='number'  onChange={(e) => { setProduct({...product, sale_price: e.target.value}) }} />
            </div>

            <div className='addproduct-price'>
                <div className="addproduct-input">
                    <p>Brand</p>
                    <select value={product.barnd} name='brand'  onChange={(e) => { setProduct({...product, brand: e.target.value}) }} className='add-product-selector'>
                        <option value='other'>Other</option>
                        <option value='canon'>Canon</option>
                        <option value='nikon'>Nikon</option>
                        <option value='sony'>Sony</option>
                        <option value='fujifilm'>Fujifilm</option>
                        <option value='panasonic'>Panasonic</option>
                        <option value='lumix'>Lumix</option>
                        <option value='sigma'>Sigma</option>
                        <option value='tamron'>Tamron</option>
                        <option value='samyang'>Samyang</option>
                    </select>
                </div>
            </div>
            </div>
            <div className='edit_grupation'>

            <div className="addproduct-input">
                <p>Model</p>
                <input value={product.model} type='text' onChange={(e) => { setProduct({...product, model: e.target.value}) }}/>
            </div>
            <div className="addproduct-input img_upload">
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : product.image} className='addproduct-img' alt='' />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden   />
                <p>Image upload</p>
            </div>
            </div>

            {product.category === 'lens' && (
                <>
                    <div className="addproduct-input">
                        <p>Focal Length</p>
                        <input value={product?.focalLength} type='text' name='focalLength' onChange={(e) => { setProduct({...product, focalLength: e.target.value}) }} />
                    </div>
                    <div className="addproduct-input">
                        <p>F-Stop</p>
                        <input value={product?.fStop} type='text' name='fStop' onChange={(e) => { setProduct({...product, fStop: e.target.value}) }} />
                    </div>
                    <div className="addproduct-input">
                        <p>Lens Mount</p>
                        <input value={product?.lensMount} type='text' name='lensMount' onChange={(e) => { setProduct({...product, lensMount: e.target.value}) }} />
                    </div>
                </>
            )

            }

            {product.category === 'camera' && (
                <>
                    <div className="addproduct-input">
                        <p>Megapixel</p>
                        <input value={product?.megaPixel}  type='text' name='megaPixel' onChange={(e) => { setProduct({...product, megaPixel: e.target.value}) }} />
                    </div>
                    <div className="addproduct-input">
                        <p>Sensor</p>
                        <input value={product?.sensor} type='text' name='sensor' onChange={(e) => { setProduct({...product, sensor: e.target.value}) }} />
                    </div>
                    <div className="addproduct-input">
                        <p>Lens Mount</p>
                        <input value={product?.mount}  type='text' name='mount' onChange={(e) => { setProduct({...product, mount: e.target.value}) }} />
                    </div>
                </>
            )}


            {product.category === 'lighting' && (
                <div className="addproduct-input">
                    <p>Description</p>
                    <input value={product?.desc} type='text' name='desc' onChange={(e) => { setProduct({...product, desc: e.target.value}) }} />
                </div>
            )}

            <button className='addproduct-btn'>Save</button>

        </form>
    )
}

export default EditProduct
