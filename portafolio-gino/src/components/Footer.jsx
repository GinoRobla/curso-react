import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__copyright">
                    © 2025 Gino Robla. Todos los derechos reservados.
                </p>
                <div className="footer__social">
                    <a 
                        href="https://linkedin.com/in/tu-perfil" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="footer__link"
                    >
                        LinkedIn
                    </a>
                    <span className="footer__separator">|</span>
                    <a 
                        href="https://github.com/tu-usuario" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="footer__link"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer