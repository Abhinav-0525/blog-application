import React from 'react'

function Footer() {
  return (
    <div className='bg-dark'>
<footer className="text-center text-lg-start bg-body-tertiary text-muted">
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>

    <div>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-google"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </section>

  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>Blog App
          </h6>
          <p>
            This is full-stack application that lets the user to post their blogs/articles and lets other users read them.
          </p>
        </div>
        
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">
            Built Using
          </h6>
          <p className="text-reset">React</p>
          <p className="text-reset">MongoDB</p>
          <p className="text-reset">Node JS</p>
          <p className="text-reset">Express JS</p>
        </div>
        
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" className="text-reset">Home</a>
          </p>
          <p>
            <a href="#!" className="text-reset">SignIn</a>
          </p>
          <p>
            <a href="#!" className="text-reset">SignUp</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Help</a>
          </p>
        </div>
        
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3"></i>Hyderabad, India</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            abhinavsai.janipireddy@gmail.com
          </p>
          <p><i className="fas fa-phone me-3"></i>+91 7396732009</p>
        </div>
        
      </div>
      
    </div>
  </section>
  
  <div className="text-center p-4 bg-secondary" >
    © 2021 Copyright:
    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">BlogApp.com</a>
  </div>
</footer>
    </div>
  )
}

export default Footer