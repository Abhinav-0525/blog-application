import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function authorProfile() {
  return (
    <div className="mb-5">
      <ul className="nav justify-content-center">
        <li className="nav-item p-4">
          <NavLink className="nav-link text-dark border-bottom border-dark border-2 fs-3" to="">View Articles</NavLink>
        </li>
        <li className="nav-item p-4">
          <NavLink className="nav-link text-dark border-bottom border-dark border-2 fs-3" to="add-article">Add Article</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}

export default authorProfile