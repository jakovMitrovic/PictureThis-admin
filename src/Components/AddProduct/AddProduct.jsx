import React, { useState } from 'react'
import './Addproduct.css'
import upload from '../../assets/upload_area.svg'


const AddProduct = () => {

    const [image, setImage] = useState(false)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [sale_price, setSale_price] = useState()
    const [brand, setBrand] = useState('other')
    const [model, setModel] = useState()


    const [productDetails, setProductDetails] = useState({
        category: "camera",
    })

   

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const onCategoryChange = (e) => {
        setProductDetails({ [e.target.name]: e.target.value })
    }


    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const addProduct = async () => {

        let responseData;
        let product = { ...productDetails, name, price, sale_price, brand, model };

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data })

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product)

            await fetch('http://localhost:4000/products/addProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            }).then((res) => res.json()).then((data) => {
                data.success ? alert(`${productDetails.category} added!`) : alert('Error')
            })
        }
    }

    const submitF = (e) =>{
        e.preventDefault()
        addProduct()
        document.getElementById("product_form").reset();
        setImage(false)
        setProductDetails({ category: "camera",})
    }

    return (
        <>
        <form className='add-product' id='product_form' onSubmit={(e)=>{submitF(e)}}>
        <h1>Add new products</h1>
            <div className="addproduct-input">
                <p>Product name</p>
                <input value={productDetails.name} onChange={(e) => { setName(e.target.value) }} type='text' name='name' required="true"/>
            </div>
            <div className='addproduct-price'>
                <div className="addproduct-input">
                    <p>Price</p>
                    <input value={productDetails.price} onChange={(e) => { setPrice(e.target.value) }} type='number' name='price' required="true"/>
                </div>
                <div className="addproduct-input">
                    <p>Sale Price</p>
                    <input value={productDetails.sale_price} onChange={(e) => { setSale_price(e.target.value) }} type='number' name='sale_price' placeholder='Optional' />
                </div>
            </div>

            <div className='addproduct-price'>
                <div className="addproduct-input">
                    <p>Brand</p>
                    <select value={productDetails.barnd} onChange={(e) => { setBrand(e.target.value) }} name='brand' className='add-product-selector'>
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
                <div className="addproduct-input">
                    <p>Model</p>
                    <input value={productDetails.model} onChange={(e) => { setModel(e.target.value) }} type='text' name='name' required="true"/>
                </div>
            </div>
            <div className='addproduct-price '>
                <div className="addproduct-input">
                    <p>Product Category</p>
                    <select value={productDetails.category} onChange={onCategoryChange} name='category' className='add-product-selector'>
                        <option value='camera'>Camera</option>
                        <option value='lens'>Lenses</option>
                        <option value='other'>Other</option>
                    </select>
                </div>

                <div className="addproduct-input img_upload">
                    <label htmlFor='file-input'>
                        <img src={image ? URL.createObjectURL(image) : upload} className='addproduct-img' alt='' />
                    </label>
                    <input onChange={imageHandler} type='file' name='image' id='file-input' hidden required="true"/>
                    <p>Image upload</p>
                </div>

            </div>
            {productDetails.category === 'lens' && (
                <>
                    <div className="addproduct-input">
                        <p>Focal Length</p>
                        <input value={productDetails.focalLength} onChange={changeHandler} type='text' name='focalLength' required="true"/>
                    </div>
                    <div className="addproduct-input">
                        <p>F-Stop</p>
                        <input value={productDetails.fStop} onChange={changeHandler} type='text' name='fStop' required="true"/>
                    </div>
                    <div className="addproduct-input">
                        <p>Lens Mount</p>
                        <input value={productDetails.lensMount} onChange={changeHandler} type='text' name='lensMount' required="true"/>
                    </div>
                </>
            )

            }

            {productDetails.category === 'camera' && (
                <>
                    <div className="addproduct-input">
                        <p>Megapixel</p>
                        <input value={productDetails.megaPixel} onChange={changeHandler} type='text' name='megaPixel' required="true"/>
                    </div>
                    <div className="addproduct-input">
                        <p>Sensor</p>
                        <input value={productDetails.sensor} onChange={changeHandler} type='text' name='sensor' required="true"/>
                    </div>
                    <div className="addproduct-input">
                        <p>Lens Mount</p>
                        <input value={productDetails.mount} onChange={changeHandler} type='text' name='mount' required="true"/>
                    </div>
                </>
            )}


            {productDetails.category === 'other' && (
                <div className="addproduct-input">
                    <p>Description</p>
                    <input value={productDetails.desc} onChange={changeHandler} type='text' name='desc' required="true"/>
                </div>
            )}

            <button  className='addproduct-btn'>Add</button>
        </form>
        </>
    )
}

export default AddProduct
