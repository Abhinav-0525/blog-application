import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorLoginThunk } from '../redux/userAuthorSlice';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { useContext } from 'react';
import { RegisterContext } from '../Contexts/RegisterContext';


function Login() {

    let {register, handleSubmit, formState:{errors}} = useForm();
    let {loginUserStatus, currentUser, errorOccurred,errMsg} = useSelector(state=>state.userAuthorLoginReducer)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let {registerNotify} = useContext(RegisterContext)
    let [regiSnack, setRegiSnack] = registerNotify

    function formSubmission(obj){
        console.log(obj);
        dispatch(userAuthorLoginThunk(obj))
    }
    useEffect(()=>{
        if(loginUserStatus){
            if(currentUser.userType==='user'){
                navigate('/user-profile')
            }
            if(currentUser.userType==='author'){
                navigate('/author-profile')
            }
        }
    },[loginUserStatus])

    function handleClose(event){
        setRegiSnack(false);
    }

  return (
    <div className='mb-5'>
        <h1 className='text-center display-3 mt-3'>Login</h1>
        <div className='border w-50 mx-auto m-5 p-3' >
        {errorOccurred === true && (<p className="text-center text-danger fs-6">{errMsg}</p> )}
            <form onSubmit={handleSubmit(formSubmission)}>
                <div className=''>
                    <div>
                        <div className='d-flex justify-content-center align-items-center mt-3 mb-4'>
                            <div>
                              <p className='fs-5 my-auto'>Login as:</p>
                            </div>
                            <div className='form-check mx-4'>
                                <input className='form-check-input' id='author' name='type' value='author' type="radio" {...register('userType', {required:true})} />
                                <label className='form-check-label' htmlFor='author'>author</label>
                            </div>
                            <div className='form-check mx-4'>
                                <input className='form-check-input' id='user' name='type' value='user' type="radio" {...register('userType', {required:true})} />
                                <label className='form-check-label' htmlFor='user'>user</label>
                            </div>
                        </div>
                        {errors.userType?.type==='required' && <p className='fs-6 text-center text-danger'>Please select a usertype!</p>}
                    </div>
                    
                    <div className='w-75 mx-auto p-2'>
                        <label htmlFor='username' className='form-label fs-5'>Username</label>
                        <input type="text" id='username' className='form-control' {...register('username', {required:true})}  />
                        {errors.username?.type==='required' && <p className='fs-6 text-danger'>This field cant be empty!</p>}
                    </div>
                    <div className='w-75 mx-auto p-2'>
                        <label htmlFor='password' className='form-label fs-5'>Password</label>
                        <input type="password" id='password' className='form-control' {...register('password', {required:true})}/>
                        {errors.password?.type==='required' && <p className='fs-6 text-danger'>This field cant be empty!</p>}
                    </div>

                     <div className='w-75 mx-auto p-2'>
                        <p>test author login: abinay 1234</p>
                        <p>test user login: jas 12345</p>
                    </div>
                            
                        
                    <div className='m-3 d-flex justify-content-center'>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </div>
            </form>
            <Snackbar 
                anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
                open={regiSnack}
                autoHideDuration={4000}
                severity="success"
                onClose={handleClose}
                message="Registration Successful!" 
                ContentProps={{
                    sx:{
                      border: "1px solid black",
                      borderRadius: "40px",
                      color: "black",
                      bgcolor: "lightseagreen",
                      fontWeight: "bold",
                    }
                 }}>
            </Snackbar>

        </div>
    </div>
  )
}

export default Login