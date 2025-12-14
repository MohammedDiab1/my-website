import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Get In Touch
                </motion.h2>

                <div className="contact-content">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3>Let's Connect</h3>
                        <p>
                            I'm always open to discussing new research collaborations, opportunities,
                            or just chatting about robotics and AI. Feel free to reach out through any of the channels below.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <div className="contact-text">
                                    <h4>Email</h4>
                                    <a href="mailto:m.diab.phd@gmail.com">m.diab.phd@gmail.com</a>
                                    <a href="mailto:mohammed.diab@plymouth.ac.uk">mohammed.diab@plymouth.ac.uk</a>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub /></a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
                    </motion.form>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Mohammed Diab. All rights reserved.</p>
            </footer>
        </section>
    );
};

export default Contact;
