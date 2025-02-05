import React from 'react'
import bg from '../Assets/bg-1.webp'
import '../Components/Home.css'

function Home() {
  return (
    <div className=''>
      <div className='box'>
        <img src={bg}  alt="" className='bg'/>
        <div className='left'>
            <p className='display-4'>Full-Stack<br></br> Blog Application</p>
        </div>
        {/* <div className='right'>
            <p className='lead fw-bold'>Created by:<br/> J. Abhinav Sai</p>
        </div> */}
      </div>
      
    </div>
  )
}

export default Home