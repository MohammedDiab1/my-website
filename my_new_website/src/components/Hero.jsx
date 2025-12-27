import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import NeuralNetwork from './NeuralNetwork';
import './Hero.css';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-bg">
                <NeuralNetwork />
            </div>
            <div className="container hero-container">
                <motion.div
                    className="hero-content-wrapper"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="hero-text-content">
                        <motion.h2
                            className="hero-greeting"
                            variants={itemVariants}
                        >
                            Hello, I'm
                        </motion.h2>
                        <motion.h1
                            className="hero-name glow-text"
                            variants={itemVariants}
                        >
                            Mohammed Diab<span className="dot">.</span>
                        </motion.h1>
                        <motion.h3
                            className="hero-title"
                            variants={itemVariants}
                        >
                            PhD | Principal Autonomy Engineer
                        </motion.h3>
                        <motion.p
                            className="hero-description"
                            variants={itemVariants}
                        >
                            Foundation models, Automation, Neuro-symbolic reasoning, LLM, VLA, VLM, HRI, Infrastructure
                        </motion.p>

                        <motion.div
                            className="hero-cta"
                            variants={itemVariants}
                        >
                            <Link to="projects" smooth={true} duration={500} className="btn btn-primary">
                                View My Work
                            </Link>
                            <Link to="contact" smooth={true} duration={500} className="btn btn-outline">
                                Contact Me
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hero-image-content"
                        variants={imageVariants}
                    >
                        <div className="image-wrapper">
                            <div className="image-glow"></div>
                            <img src="/my-website/profile.jpg" alt="Mohammed Diab" className="profile-image" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
