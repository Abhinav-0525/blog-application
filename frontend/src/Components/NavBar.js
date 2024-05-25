import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../redux/userAuthorSlice";
import logo from '../Assets/logo2.png'
import { HiHome } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";



function NavBar() {
  let {loginUserStatus, currentUser} = useSelector(state=>state.userAuthorLoginReducer)
  let dispatch = useDispatch()

  function signOut(){
    //remove token from local storage and reset the state
    localStorage.removeItem('token');
    dispatch(resetState())
  }

  return (
    <div className="bg-dark row py-2 fs-5">
      <div className="col justify-content-start">
        <Link className="nav-link" to=''>
          <img src={logo} height="50" alt="" style={{ marginLeft:"6px", borderRadius:"50%"}} />
        </Link>
      </div>
      <ul className="col nav justify-content-end">
        {loginUserStatus===false?
        <>
        <li className="nav-item ">
          
          <Link className="nav-link text-white d-flex" to=''>
            <HiHome className="mt-1"/>
            <p className="mb-0 pb-0">Home</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to='register'>
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to='login'>
            Login
          </Link>
        </li>
        </>:
        <>
        <p className="fs-4 text-white my-auto">Hello, {currentUser.username}</p>
        <li className="nav-item">
        <Link className="nav-link text-white fs-4 d-flex" to='' onClick={signOut}>
          <TbLogout className="mt-2"/>
          <p className="mb-0 pb-0">Logout</p>
        </Link>
      </li>
      </>}
        
      </ul>
    </div>
  );
}

export default NavBar;
