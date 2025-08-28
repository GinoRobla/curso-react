import React from 'react'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; 2024 <span className="footer-highlight">Elegant Blog</span> - Plataforma de blogging elegante y moderna
        </p>
        <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-3)' }}>
          Crafted with <span className="footer-highlight">passion</span> using React, Node.js, MongoDB y CSS moderno
        </p>
        <p style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)', opacity: 0.7 }}>
          ✦ Diseñado para escritores, creadores y lectores apasionados ✦
        </p>
      </div>
    </footer>
  )
}
