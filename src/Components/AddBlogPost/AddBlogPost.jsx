import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { AdminContext } from '../../Context/AdminContext'
import './AddBlogPost.css'
import upload from '../../assets/upload_area.svg'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image','video'],
        ['clean']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]
const AddBlogPost = () => {

    const [admin, setAdmin] = useContext(AdminContext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    const handleSubit = async (ev) => {
        ev.preventDefault();
        let responseData;
        let formData = new FormData();
        formData.append('product', file);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data })


        const data = {
            title:title,
            description:description,
            content:content,
            cover:responseData.image_url,
            author: admin._id
        }
        
        if (title === '' && description === '' && content === '' && file === '') {
            alert("Fill in every field")
            return
        }

        const res = await fetch('http://localhost:4000/blogPosts/addBlogPost', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        alert(res)
        navigate('/')

    }




    return (
        <div className='createBlog'>
            <h1 className='createBlogTitle'>Create a new blog post</h1>
            <form className='createForm' onSubmit={handleSubit}>
                <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required/>
                <input type='summary' placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} required/>
                <label className='fileInput'>
                    <img src={file !== '' ? URL.createObjectURL(file) : upload} />
                    Add an Image
                    <input type='file' hidden onChange={e => setFile(e.target.files[0])} required/>
                </label>
                <ReactQuill className='contentInput' value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} required/>
                <br />
                <p className='error-message'>{message}</p>
                <button type='submit'>Create Post</button>
            </form>
        </div>
    )
}

export default AddBlogPost
