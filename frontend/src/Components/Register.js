import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RegisterContext } from '../Contexts/RegisterContext';

function Register() {

    let {register, handleSubmit, formState:{errors} } = useForm();
    let [err, setErr] = useState('');
    let navigate = useNavigate();
    let {registerNotify} = useContext(RegisterContext)
    let [regiSnack, setRegiSnack] = registerNotify;

    async function formSubmission(obj){
        if(obj.userType === 'user'){
            let res = await axios.post('http://localhost:4000/user-api/user', obj);
            if(res.data.message === "User created"){
                setRegiSnack(true)
                navigate('/login')
            }
            else{
                setErr(res.data.message)
            }
        }
        else{
            let res = await axios.post('http://localhost:4000/author-api/author', obj);
            if(res.data.message === "Author created"){
                setRegiSnack(true)
                navigate('/login')
            }
            else{
                setErr(res.data.message)
            }
        }
        
    }

    

  return (
    <div>
        <h1 className='text-center display-3 mt-3'>Register</h1>
        <div className='border w-50 mx-auto mt-5 p-3 mb-5'>
            {err.length!==0 && <p className='text-danger fs-5 ms-3'>{err}</p>}
            <form onSubmit={handleSubmit(formSubmission)}>
                <div >
                    <div>
                        <div className='d-flex justify-content-center align-items-center mt-3 mb-4'>
                            <div >
                                <p className='fs-5 my-auto'>Register as:</p>
                            </div>
                            <div className='form-check mx-4'>
                                <input className='form-check-input' id='author' name='type' value='author' type="radio" {...register('userType',{ required:true})} />
                                <label className='form-check-label' htmlFor='author'>author</label>

                            </div>
                            <div className='form-check mx-4'>
                                <input className='form-check-input' id='user' name='type' value='user' type="radio" {...register('userType',{ required:true})}/>
                                <label className='form-check-label' htmlFor='user'>user</label>
                            </div>
                        </div>
                        {errors.userType?.type==='required' && <p className='fs-6 text-center text-danger'>Please select a usertype!</p>}
                    </div>
                    <div className='w-75 mx-auto p-2'>
                        <label htmlFor='username' className='form-label fs-5'>Username</label>
                        <input type="text" id='username' className='form-control' {...register('username',{required:true,minLength:6, maxLength:12})} />
                        {errors.username?.type==='required' && <p className='fs-6 text-danger'>This field cant be empty!</p>}
                        {errors.username?.type==='minLength' && <p className='fs-6 text-danger'>Should contain min 6 characters</p>}
                        {errors.username?.type==='maxLength' && <p className='fs-6 text-danger'>Should contain max 12 characters</p>}
                    </div>
                    <div className='w-75 mx-auto p-2'>
                        <label htmlFor='email' className='form-label fs-5'>E-mail</label>
                        <input type="email" id='email' className='form-control' {...register('email',{required:true})} />
                        {errors.email?.type==='required' && <p className='fs-6 text-danger'>This field cant be empty!</p>}
                    </div>
                    <div className='w-75 mx-auto p-2'>
                        <label htmlFor='password' className='form-label fs-5'>Password</label>
                        <input type="password" id='password' className='form-control' {...register('password',{required:true,minLength:8})} />
                        {errors.password?.type==='required' && <p className='fs-6 text-danger'>This field cant be empty!</p>}
                        {errors.password?.type==='minLength' && <p className='fs-6 text-danger'>Weak password!</p>}
                    </div>
                    <div className='m-3 d-flex justify-content-center'>
                        <button className='btn btn-primary'>Register</button>
                    </div>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default Register