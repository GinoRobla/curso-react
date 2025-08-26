import React, { useEffect } from 'react';
import '../styles/skills.css';

const Skills = () => {
    useEffect(() => {
        const cards = document.querySelectorAll('.skill__category');
        
        const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
        };
        
        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
        });
        
        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
            });
        };
    }, []);
    const skillCategories = [
        {
            title: 'Frontend',
            color: '#37AE7C',
            known: ['JavaScript', 'React', 'HTML', 'CSS'],
            learning: ['TypeScript', 'Tailwind CSS', 'Next.js']
        },
        {
            title: 'Backend',
            color: '#59FFB9',
            known: ['Node.js', 'Express', 'Python', 'Flask'],
            learning: []
        },
        {
            title: 'Bases de Datos',
            color: '#00FF94',
            known: ['MongoDB', 'MySQL'],
            learning: []
        },
        {
            title: 'Programación',
            color: '#64fcd9',
            known: ['C++', 'C#', 'Python'],
            learning: []
        },
        {
            title: 'DevOps & Cloud',
            color: '#FF6B6B',
            known: ['Linux', 'Git', 'GitHub'],
            learning: ['Docker', 'AWS']
        },
        {
            title: 'Inteligencia Artificial',
            color: '#FF69B4',
            known: [],
            learning: ['Machine Learning', 'Deep Learning']
        },
        {
            title: 'Marketing Digital',
            color: '#87CEEB',
            known: [],
            learning: ['SEO (para programadores)']
        }
    ];

    return (
        <section id="skills" className="section container">
            <h2 className="section__title">Habilidades & Tecnologías</h2>
            
            <div className="skills">
                {skillCategories.map((category, index) => (
                    <div key={index} className="skill__category">
                        <h3 className="skill__category-title" style={{ color: category.color }}>
                            {category.title}
                        </h3>
                        <div className="skill__category-content">
                            {category.known.length > 0 && (
                                <div className="skill__section">
                                    <h4 className="skill__section-title">Domino</h4>
                                    <div className="skill__tags">
                                        {category.known.map((skill, skillIndex) => (
                                            <span 
                                                key={skillIndex} 
                                                className="skill__tag skill__tag--known"
                                                style={{ 
                                                    backgroundColor: `${category.color}20`,
                                                    borderColor: category.color,
                                                    color: category.color
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {category.learning.length > 0 && (
                                <div className="skill__section">
                                    <h4 className="skill__section-title">Aprendiendo</h4>
                                    <div className="skill__tags">
                                        {category.learning.map((skill, skillIndex) => (
                                            <span 
                                                key={skillIndex} 
                                                className="skill__tag skill__tag--learning"
                                                style={{ 
                                                    backgroundColor: 'transparent',
                                                    borderColor: category.color,
                                                    color: category.color
                                                }}
                                            >
                                                {skill}
                                                <span className="skill__learning-indicator">📚</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
