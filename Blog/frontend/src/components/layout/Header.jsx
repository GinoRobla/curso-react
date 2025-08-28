import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/inicio" className="logo-container">
          <div className="logo"></div>
          <span className="logo-text">Elegant Blog</span>
        </Link>
      </div>
    </header>
  )
}
