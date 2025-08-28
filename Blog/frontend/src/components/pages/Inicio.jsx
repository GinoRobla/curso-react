import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className="fade-in-up">
      <section className="hero">
        <h1 className="hero-title">Bienvenido a Elegant Blog</h1>
        <p className="hero-subtitle">
          Una plataforma elegante y moderna para crear, compartir y descubrir contenido excepcional. 
          Diseñado para escritores, creadores y lectores apasionados.
        </p>
        
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
            alt="Escritura creativa - Elegant Blog" 
          />
        </div>
        
        <div className="hero-actions">
          <Link to="/articulos" className="btn btn-primary btn-lg">
            Explorar Artículos
          </Link>
          <Link to="/crear-articulo" className="btn btn-outline btn-lg">
            Comenzar a Escribir
          </Link>
        </div>
      </section>

      <section className="articles-section">
        <h2 className="section-title">¿Por qué elegir Elegant Blog?</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--space-6)', 
          marginBottom: 'var(--space-12)' 
        }}>
          <div className="sidebar-widget glass fade-in-left">
            <h3 className="widget-title">
              <span style={{ fontSize: '1.2em', marginRight: 'var(--space-2)' }}>✦</span>
              Diseño Elegante
            </h3>
            <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
              Interfaz minimalista y moderna que pone el foco en tu contenido. 
              Diseño responsive que se adapta perfectamente a cualquier dispositivo.
            </p>
          </div>

          <div className="sidebar-widget glass fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="widget-title">
              <span style={{ fontSize: '1.2em', marginRight: 'var(--space-2)' }}>◆</span>
              Rendimiento Óptimo
            </h3>
            <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
              Construido con las últimas tecnologías web. Carga rápida, 
              navegación fluida y experiencia de usuario excepcional.
            </p>
          </div>

          <div className="sidebar-widget glass fade-in-right" style={{ animationDelay: '0.2s' }}>
            <h3 className="widget-title">
              <span style={{ fontSize: '1.2em', marginRight: 'var(--space-2)' }}>◇</span>
              Fácil de Usar
            </h3>
            <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
              Editor intuitivo con gestión sencilla de imágenes y 
              herramientas de búsqueda avanzadas para una experiencia fluida.
            </p>
          </div>

          <div className="sidebar-widget glass fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="widget-title">
              <span style={{ fontSize: '1.2em', marginRight: 'var(--space-2)' }}>◈</span>
              Código Abierto
            </h3>
            <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
              Desarrollado con tecnologías modernas y código limpio. 
              Totalmente personalizable y escalable para tus necesidades.
            </p>
          </div>
        </div>

        <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h3 className="form-title">Tecnologías Modernas</h3>
          <p className="form-subtitle">Stack tecnológico de vanguardia</p>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 'var(--space-3)', 
            justifyContent: 'center',
            marginTop: 'var(--space-6)'
          }}>
            {[
              { name: 'React', color: '#61dafb' },
              { name: 'Node.js', color: '#68a063' },
              { name: 'MongoDB', color: '#4db33d' },
              { name: 'Express', color: '#000000' },
              { name: 'JavaScript', color: '#f7df1e' },
              { name: 'CSS3', color: '#1572b6' }
            ].map((tech, index) => (
              <span key={tech.name} style={{
                background: `linear-gradient(135deg, ${tech.color}15 0%, ${tech.color}25 100%)`,
                color: 'var(--color-gray-800)',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-xl)',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                border: `2px solid ${tech.color}30`,
                backdropFilter: 'blur(10px)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
