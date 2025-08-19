import React from 'react'
import supportImg from '../assets/services/support.svg'
import designImg from '../assets/services/design.svg'
import developingImg from '../assets/services/developing.svg'

const Services = () => {
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const bg = card.querySelector('.service-card__bg');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        bg.style.left = `${x}px`;
        bg.style.top = `${y}px`;
        bg.style.opacity = '1';
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        const bg = card.querySelector('.service-card__bg');
        bg.style.opacity = '0';
    };

    return (
        <section id="services" className="section container">
            <h2 className="section__title">Servicios</h2>

            <div className="service-cards">
                <article 
                    className="service-card__box"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="service-card__illustration">
                        <img src={designImg} alt="Frontend Development Illustration"/>
                    </span>
                    <h3 className="service-card__title">Desarrollo de Frontend</h3>
                    <p className="service-card__msg">Desarrollo de interfaces modernas y responsivas con React.js, creando experiencias de usuario intuitivas y atractivas.</p>
                    <span className="service-card__bg"></span>
                </article>
                <article 
                    className="service-card__box"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="service-card__illustration">
                        <img src={developingImg} alt="Backend Development Illustration"/>
                    </span>
                    <h3 className="service-card__title">Desarrollo de Backend</h3>
                    <p className="service-card__msg">APIs REST robustas con Node.js y Express, integración con MongoDB y sistemas de autenticación seguros.</p>
                    <span className="service-card__bg"></span>
                </article>
                <article 
                    className="service-card__box"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="service-card__illustration">
                        <img src={supportImg} alt="Full-Stack Solutions Illustration"/>
                    </span>
                    <h3 className="service-card__title">Desarrollo Full-Stack</h3>
                    <p className="service-card__msg">Desarrollo completo de aplicaciones web, desde el análisis de requerimientos hasta la puesta en producción.</p>
                    <span className="service-card__bg"></span>
                </article>
            </div>
        </section>
    )
}

export default Services;