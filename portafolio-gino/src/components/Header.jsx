import React, { useEffect } from 'react';
import headerSvg from '../assets/illustrations/header.svg';
import cvPdf from '../assets/works/cv-gino-robla.pdf';

const Header = () => {
    useEffect(() => {
        let isUserScrolling = false;
        let scrollTimer = null;
        
        // Función para obtener la sección activa basada en la posición del scroll
        const getCurrentSection = () => {
            const sections = ['heroHeader', 'services', 'skills', 'works', 'contact'];
            const scrollPosition = window.scrollY + 150; // Offset para mejor detección
            
            // Si estamos en la parte superior (primeros 200px), mostrar Home
            if (window.scrollY < 200) {
                return 'heroHeader';
            }
            
            // Buscar la sección actual de abajo hacia arriba
            for (let i = sections.length - 1; i >= 0; i--) {
                const sectionId = sections[i];
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionBottom = sectionTop + sectionHeight;
                    
                    // Verificar si estamos dentro de esta sección
                    if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom + 100) {
                        return sectionId;
                    }
                }
            }
            
            return null;
        };
        
        // Función para actualizar la navegación activa
        const updateActiveNavigation = () => {
            const currentSection = getCurrentSection();
            const navLinks = document.querySelectorAll('.nav__list-link');
            
            // Limpiar todas las clases activas
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Activar solo la sección actual
            if (currentSection) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
        };
        
        // Función para manejar el scroll del usuario
        const handleScroll = () => {
            // Limpiar timer anterior
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            
            // Marcar que el usuario está scrolleando
            isUserScrolling = true;
            
            // Actualizar navegación inmediatamente
            updateActiveNavigation();
            
            // Después de 150ms sin scroll, permitir clicks de navegación
            scrollTimer = setTimeout(() => {
                isUserScrolling = false;
            }, 150);
        };
        
        // Función para scroll suave con offset
        const handleNavClick = (e) => {
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Si el usuario está scrolleando manualmente, esperar un momento
                if (isUserScrolling) {
                    setTimeout(() => handleNavClick(e), 200);
                    return;
                }
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Desactivar temporalmente el listener de scroll
                    window.removeEventListener('scroll', throttledScroll);
                    
                    // Scroll suave al elemento
                    const offsetTop = targetElement.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Activar inmediatamente el enlace clickeado
                    const navLinks = document.querySelectorAll('.nav__list-link');
                    navLinks.forEach(link => link.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Reactivar el listener después del scroll
                    setTimeout(() => {
                        window.addEventListener('scroll', throttledScroll);
                        updateActiveNavigation(); // Verificar posición final
                    }, 1000);
                }
            }
        };
        
        // Throttle para el scroll event
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Event listeners
        const navLinks = document.querySelectorAll('.nav__list-link');
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });
        
        window.addEventListener('scroll', throttledScroll);
        
        // Ejecutar una vez al cargar para establecer estado inicial
        updateActiveNavigation();
        
        // Cleanup
        return () => {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            navLinks.forEach(link => {
                link.removeEventListener('click', handleNavClick);
            });
            window.removeEventListener('scroll', throttledScroll);
        };
    }, []);
    return (
        <header id="heroHeader" className="hero-header">
            <nav id="navBar" className="nav">
                <div className="container">
                    <ul id="navList" className="nav__list nav__list--desktop">
                        <li className="nav__list-item">
                            <a className="nav__list-link" href="#heroHeader">&lt;Inicio /&gt;</a>
                        </li>
                        <li className="nav__list-item">
                            <a className="nav__list-link" href="#services">&lt;Servicios /&gt;</a>
                        </li>
                        <li className="nav__list-item">
                            <a className="nav__list-link" href="#skills">&lt;Habilidades /&gt;</a>
                        </li>
                        <li className="nav__list-item">
                            <a className="nav__list-link" href="#works">&lt;Mis Trabajos /&gt;</a>
                        </li>
                        <li className="nav__list-item">
                            <a className="nav__list-link" href="#contact">&lt;Contacto /&gt;</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <section className="header__container container">
                <div className="header__left">
                    <span className="header__sup-text">Hola! Soy Gino</span>
                    <h1 className="header__title">
                        <span className="header__title-1" data-role="FULL-STACK DEVELOPER">Full-Stack Developer</span>
                    </h1>
                    <p className="header__msg">
                        Desarrollador apasionado por crear soluciones digitales innovadoras con tecnologías modernas.
                        <br />
                        Especializado en el stack MERN, siempre buscando aprender nuevas tecnologías
                        <br />
                        y mejorar la experiencia del usuario en cada proyecto.
                    </p>
                    <div className="header__buttons">
                        <a href={cvPdf} target="_blank" rel="noopener noreferrer" className="header__resume">Ver CV</a>
                        <a href={cvPdf} download="CV-Gino-Robla.pdf" className="header__resume header__resume--download">Descargar CV</a>
                    </div>
                </div>
                <div className="header__right">
                    <img src={headerSvg} alt="Header section illustration" />
                </div>
            </section>
            <span className="header__bg"></span>
        </header>
    );
};

export default Header;
