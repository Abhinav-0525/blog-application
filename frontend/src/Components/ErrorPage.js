import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    let routeError = useRouteError();
  return (
    <div className='bg-dark mt-5'>
        <h1 className='text-center display-6 text-light p-3'>{routeError.status}-{routeError.data}</h1>
    </div>
  )
}

export default ErrorPage