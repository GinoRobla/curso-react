import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <ul>
          <li>
            <NavLink to="/inicio" className={({ isActive }) => isActive ? 'active' : ''}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/articulos" className={({ isActive }) => isActive ? 'active' : ''}>
              Artículos
            </NavLink>
          </li>
          <li>
            <NavLink to="/crear-articulo" className={({ isActive }) => isActive ? 'active' : ''}>
              Crear Artículo
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
