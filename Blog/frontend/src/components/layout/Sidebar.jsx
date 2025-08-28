import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { global } from '../../helpers/global';
import { Peticion } from '../../helpers/Peticion';

export const Sidebar = () => {
    const [buscar, setBuscar] = useState("");
    const [totalArticulos, setTotalArticulos] = useState(0);
    const navegar = useNavigate();

    useEffect(() => {
        obtenerTotalArticulos();
        
        // Actualizar contador cada 5 segundos para reflejar cambios
        const intervalo = setInterval(obtenerTotalArticulos, 5000);
        
        return () => clearInterval(intervalo);
    }, []);

    const obtenerTotalArticulos = async () => {
        try {
            const { datos } = await Peticion(global.url + "listar", "GET");
            if (datos && datos.status === "success" && datos.articles) {
                setTotalArticulos(datos.articles.length);
            }
        } catch (error) {
            console.error("Error al obtener total de artículos:", error);
            setTotalArticulos(0);
        }
    };

    const hacerBusqueda = (e) => {
        e.preventDefault();
        let miBusqueda = e.target.search_field.value;
        if (miBusqueda.trim()) {
            navegar("/buscar/" + miBusqueda, { replace: true });
            setBuscar("");
        }
    }

    return (
        <aside className="sidebar fade-in-right">
            <div className="sidebar-widget glass">
                <h3 className="widget-title">
                    Estadísticas del Blog
                </h3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)'
                }}>
                    <div style={{
                        padding: 'var(--space-4)',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: 'var(--text-2xl)',
                            fontWeight: '800',
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: 'var(--space-1)'
                        }}>
                            {totalArticulos}
                        </div>
                        <div style={{
                            color: 'var(--color-gray-600)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: '500'
                        }}>
                            Artículos Publicados
                        </div>
                    </div>
                    
                    <div style={{
                        padding: 'var(--space-4)',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: 'var(--text-xl)',
                            fontWeight: '700',
                            color: 'var(--color-gray-800)',
                            marginBottom: 'var(--space-1)'
                        }}>
                            100%
                        </div>
                        <div style={{
                            color: 'var(--color-gray-600)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: '500'
                        }}>
                            Código Abierto
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar-widget glass">
                <h3 className="widget-title">
                    Acerca del Proyecto
                </h3>
                <p style={{ 
                    color: 'var(--color-gray-600)', 
                    fontSize: 'var(--text-sm)', 
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-3)'
                }}>
                    <strong>Elegant Blog</strong> es una plataforma moderna para escritores 
                    y creadores de contenido.
                </p>
                
                <div style={{
                    padding: 'var(--space-4)',
                    background: 'rgba(245, 158, 11, 0.1)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-700)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontWeight: '600',
                        marginBottom: 'var(--space-1)'
                    }}>
                        React + Node.js
                    </div>
                    <div style={{ 
                        fontSize: 'var(--text-xs)', 
                        color: 'var(--color-gray-600)' 
                    }}>
                        Stack moderno
                    </div>
                </div>
            </div>

            <div className="sidebar-widget glass">
                <h3 className="widget-title">
                    Acciones Rápidas
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <button 
                        onClick={() => navegar('/crear-articulo')}
                        className="btn btn-primary w-full"
                        style={{ padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)' }}
                    >
                        Nuevo Artículo
                    </button>
                    <button 
                        onClick={() => navegar('/articulos')}
                        className="btn btn-outline w-full"
                        style={{ padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)' }}
                    >
                        Ver Todos
                    </button>
                </div>
            </div>

            <div className="sidebar-widget glass">
                <h3 className="widget-title">
                    Últimas Tecnologías
                </h3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)'
                }}>
                    <div style={{
                        padding: 'var(--space-3)',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-gray-700)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>React 19</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)' }}>
                            Frontend
                        </div>
                    </div>
                    
                    <div style={{
                        padding: 'var(--space-3)',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-gray-700)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>Node.js 22</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)' }}>
                            Backend
                        </div>
                    </div>
                    
                    <div style={{
                        padding: 'var(--space-3)',
                        background: 'rgba(245, 158, 11, 0.1)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-gray-700)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>MongoDB 8</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)' }}>
                            Base de Datos
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
