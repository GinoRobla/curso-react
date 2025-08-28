import React from "react";
import {Routes, Route, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { Inicio } from "../components/pages/Inicio";
import { Articulos } from "../components/pages/Articulos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Crear } from "../components/pages/Crear";
import { Busqueda } from "../components/pages/Busqueda";
import { Articulo } from "../components/pages/Articulo";
import { Editar } from "../components/pages/Editar";

const Layout = () => {
    const location = useLocation();
    const isArticleDetailPage = location.pathname.startsWith('/articulo/');
    const isEditPage = location.pathname.startsWith('/editar/');
    
    // Páginas que no necesitan sidebar ni main-container
    const isSpecialLayoutPage = isArticleDetailPage || isEditPage;

    return (
        <>
            <Header/>
            <Nav/>
            
            <div className={isSpecialLayoutPage ? "" : "main-container"}>
                <main className={isSpecialLayoutPage ? "" : "content"}>
                    <Routes>
                        <Route path="/" element={<Inicio/>} />
                        <Route path="/inicio" element={<Inicio/>} />
                        <Route path="/articulos" element={<Articulos/>} />
                        <Route path="/articulo/:id" element={<Articulo/>} />
                        <Route path="/editar/:id" element={<Editar/>} />
                        <Route path="/crear-articulo" element={<Crear/>} />
                        <Route path="/buscar/:busqueda" element={<Busqueda/>} />
                        <Route path="/busqueda" element={<Busqueda/>} />
                        <Route path="/*" element={
                            <div className="form-container" style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
                                <h1 className="form-title">🚫 Error 404</h1>
                                <p className="form-subtitle">La página que buscas no existe</p>
                            </div>
                        } />
                    </Routes>
                </main>
                
                {!isSpecialLayoutPage && <Sidebar/>}
            </div>
            
            <Footer/>
        </>
    );
}

export const Rutas = () => {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}