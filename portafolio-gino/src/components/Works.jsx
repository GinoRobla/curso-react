import React from 'react'
import sampleImg from '../assets/works/sample.png'

const Works = () => {
    const projects = [
        {
            id: 1,
            title: "Red Social MERN",
            description: "Plataforma social completa con autenticación, posts, likes, comentarios y perfiles de usuario.",
            image: sampleImg,
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            demoUrl: "https://mi-red-social.vercel.app", // Cambia por tu URL real
            repoUrl: "https://github.com/tu-usuario/red-social-mern" // Cambia por tu repo real
        },
        {
            id: 2,
            title: "E-Commerce MERN",
            description: "Tienda online con carrito de compras, gestión de productos, autenticación y panel de administración.",
            image: sampleImg,
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            demoUrl: "https://mi-ecommerce.vercel.app", // Cambia por tu URL real
            repoUrl: "https://github.com/tu-usuario/ecommerce-mern" // Cambia por tu repo real
        },
        {
            id: 3,
            title: "API REST + Frontend",
            description: "API completa con documentación, autenticación JWT y frontend para consumir los endpoints.",
            image: sampleImg,
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            demoUrl: "https://mi-api-demo.vercel.app", // Cambia por tu URL real
            repoUrl: "https://github.com/tu-usuario/api-rest-demo" // Cambia por tu repo real
        }
    ];

    return (
        <section id="works" className="section container">
            <h2 className="section__title">Mis Trabajos</h2>
            <div className="works">
                {projects.map(project => (
                    <article key={project.id} className="work">
                        <div className="work__box">
                            <div className="work__img-box">
                                <img src={project.image} alt={project.title}/>
                                <div className="work__overlay">
                                    <div className="work__buttons">
                                        <a 
                                            href={project.demoUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="work__btn work__btn--demo"
                                        >
                                            Ver Demo
                                        </a>
                                        <a 
                                            href={project.repoUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="work__btn work__btn--code"
                                        >
                                            Ver Código
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="work__content">
                                <h3 className="work__title">{project.title}</h3>
                                <p className="work__description">{project.description}</p>
                                <div className="work__badges">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="work__badge">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Works;