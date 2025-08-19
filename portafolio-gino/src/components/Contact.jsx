import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('');

        try {
            // Configura estos valores con tus credenciales de EmailJS
            const serviceID = 'service_r6itm7h';
            const templateID = 'template_5561yvk';
            const userID = 'slup3VZDUxpI_PuUM';

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                to_name: 'Gino',
                message: `
                    Mensaje del portafolio web:

                    De: ${formData.name}
                    Email: ${formData.email}

                    Mensaje: ${formData.message}

                    ---Este mensaje fue enviado desde tu formulario de contacto del portafolio.
                `,
                reply_to: formData.email,
            };

            await emailjs.send(serviceID, templateID, templateParams, userID);
            
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error al enviar email:', error);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="section container">
            <h2 className="section__title">Contactame!</h2>
            <div className="contact">
                <form className="contact__form" onSubmit={handleSubmit}>
                    <div className="contact__field-wrapper">
                        <label htmlFor="contactNameTxt">Name:</label>
                        <input 
                            id="contactNameTxt" 
                            name="name"
                            type="text" 
                            placeholder="What's your name?" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="contact__field-wrapper">
                        <label htmlFor="contactEmailTxt">Email:</label>
                        <input 
                            id="contactEmailTxt" 
                            name="email"
                            type="email" 
                            placeholder="your.email@example.com" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact__field-wrapper">
                        <label htmlFor="contactDescriptionTxt">Message:</label>
                        <textarea 
                            id="contactDescriptionTxt" 
                            name="message"
                            placeholder="Let's connect!"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    {status === 'success' && (
                        <div className="contact__status contact__status--success">
                            ¡Mensaje enviado correctamente! Te responderé pronto.
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="contact__status contact__status--error">
                            Error al enviar el mensaje. Por favor, inténtalo de nuevo.
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="contact__submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando...' : 'Submit'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact