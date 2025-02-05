import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {axiosWithToken} from './axiosWithToken';
import { RegisterContext } from '../Contexts/RegisterContext';


function AddArticle() {

    let {register, handleSubmit, formState: {errors}} = useForm()
    let {currentUser} = useSelector(state=>state.userAuthorLoginReducer)
    let navigate = useNavigate()
    let [err, setErr] = useState("")
    let {articleCreateNotify} = useContext(RegisterContext); 
    let [artiSnack, setArtiSnack] = articleCreateNotify;


    async function handlePostSubmit(data) {
        data.dateOfCreation = new Date();
        data.dateOfModification = new Date();
        data.articleId = Date.now();
        data.username = currentUser.username;
        data.comments = [];
        data.status = true;
        //console.log(data)

        //making http post req
        let resp = await axiosWithToken.post(`${process.env.REACT_APP_API_URL}/author-api/article`, data)
        console.log(resp)
        if(resp.data.message==="Article created"){
            setArtiSnack(true);
            navigate('/author-profile')
        }
        else{
            setErr(resp.data.message)
        }
    }

  return (
    <div className='w-50 sm-w-75 mx-auto border border-dark p-5'>
        <form onSubmit={handleSubmit(handlePostSubmit)}>
            {/* //generate code to display error */}
            {/* {useEffect(()=>{
                if(errors!==null){
                    <p className='text-danger'>{errors.title}</p>
                }
                
            })} */}
            {/* {useEffect(()=>{
                if(errors!==null){
                    <p className='text-danger'>{errors.title}</p>
                }  
                console.log(errors)  
            },[errors])} */}
            <div className='pb-4'>
                <label className='form-label fs-5' htmlFor='title'>Title</label>
                <input className='form-control' type='text' id='title' {...register('title', {required: true})} />
            </div>
            
            <div className='pb-4'>
                <label className='form-label fs-5' htmlFor='category'>Category</label>
                <select className='form-select' id='category' defaultValue={""} {...register('category', {required: true})} >
                    <option value='' disabled >select option</option>
                    <option value='programming'>Programming</option>
                    <option value='development'>Development</option>
                    <option value='life-skills'>Life skills</option>
                    <option value='other'>Other</option>
                </select>
            </div>
            <div className='pb-4'>
                <label className='form-label fs-5' htmlFor='content'>Content</label>
                <textarea className='form-control' id='content' {...register('content', {required: true})} placeholder='Should contain at most 200 characters' rows='10' />
            </div>
            <div className='justify-content-end d-flex'>
                <button className='btn btn-primary px-3' type='submit'>Post</button>
            </div>
        </form>
    </div>
  )
}

export default AddArticle