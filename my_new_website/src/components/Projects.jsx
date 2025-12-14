import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaYoutube, FaPlay, FaPause } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const [playingVideo, setPlayingVideo] = useState(null);
    const videoRef = useRef(null);

    const handlePlayVideo = (id) => {
        if (playingVideo === id) {
            videoRef.current.pause();
            setPlayingVideo(null);
        } else {
            setPlayingVideo(id);
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play();
                }
            }, 100);
        }
    };

    const projects = [
        {
            id: 1,
            title: "RECOVER - Neurosymbolic Framework",
            category: "Neuro-Symbolic AI",
            description: "A neurosymbolic framework combining ontologies, logical rules, and LLM-based planners for real-time failure detection and recovery in robotics. Published at IROS 2024.",
            tags: ["Neuro-Symbolic", "LLM", "Ontologies", "IROS 2024"],
            videoId: null,
            localVideo: "/recover_video.mp4",
            image: "/bipedal_robot.png", // Fallback/Poster
            links: {
                demo: "https://recover-ontothor.github.io/",
                code: "https://arxiv.org/abs/2404.00756"
            }
        },
        {
            id: 2,
            title: "SkillMaN - Skill-Based Manipulation",
            category: "Robot Manipulation",
            description: "A skill-based robotic manipulation framework integrating perception and reasoning to enable robots to perform complex tasks. Focuses on learning manipulation skills like pick-up, put-down, and open-drawer.",
            tags: ["Manipulation", "Perception", "Task Planning", "Skills"],
            videoId: "LxHj8P5dQLo",
            image: "/tiago_yumi.png",
            links: {
                demo: "https://www.sciencedirect.com/science/article/abs/pii/S0921889020304930",
                code: "https://www.sciencedirect.com/science/article/abs/pii/S0921889020304930"
            }
        },
        {
            id: 3,
            title: "PMK - Perception and Manipulation Knowledge",
            category: "Knowledge Representation",
            description: "An ontology-based knowledge processing framework for autonomous robotics. Provides semantic linking of perception data with high-level knowledge for enhanced task and motion planning.",
            tags: ["Ontologies", "Knowledge Processing", "TAMP", "IEEE-1872"],
            videoId: "XDm75rm2FzM",
            image: "/kinova_baxter.png",
            links: {
                demo: "https://www.mdpi.com/1424-8220/19/5/1166",
                code: "https://www.mdpi.com/1424-8220/19/5/1166"
            }
        },
        {
            id: 4,
            title: "TICK - Trust in Human-Robot Interaction",
            category: "Human-Robot Interaction",
            description: "Trust-Inferring Infrastructure for Cognitive Knowledge (TICK) - A knowledge processing infrastructure for assessing and building trust in HRI through multimodal sensing and reasoning.",
            tags: ["HRI", "Trust", "Cognitive", "Multimodal"],
            videoId: "S2WX9fyk124",
            image: "/tick_trust.png",
            links: {
                demo: "https://link.springer.com/article/10.1007/s12369-024-01206-1",
                code: "https://link.springer.com/article/10.1007/s12369-024-01206-1"
            }
        },
        {
            id: 5,
            title: "Transfer Learning in Robotics",
            category: "Machine Learning",
            description: "Research on transfer learning techniques for robotic manipulation tasks, enabling efficient skill acquisition across different domains.",
            tags: ["Transfer Learning", "Robotics", "Machine Learning"],
            videoId: "F12ZKlUG9TY",
            image: "/transfer_learning.png",
            links: {
                demo: "https://link.springer.com/article/10.1007/s10458-024-09653-w",
                code: "https://link.springer.com/article/10.1007/s10458-024-09653-w"
            }
        },
        {
            id: 6,
            title: "Ontology Standardization",
            category: "Standards",
            description: "Contribution to the IEEE Standard for Ontologies for Robotics and Automation, defining core concepts for knowledge representation in robotics.",
            tags: ["IEEE Standard", "Ontology", "Robotics", "Automation"],
            videoId: null,
            image: "/bipedal_robot.png",
            links: {
                demo: "https://ieeexplore.ieee.org/document/9535344",
                code: "https://ieeexplore.ieee.org/document/9535344"
            }
        }
    ];

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Selected Research Work
                </motion.h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="project-image">
                                {project.localVideo ? (
                                    <div className="video-container">
                                        <video
                                            ref={playingVideo === project.id ? videoRef : null}
                                            src={project.localVideo}
                                            poster={project.image}
                                            controls={playingVideo === project.id}
                                            className="project-video"
                                            onClick={() => handlePlayVideo(project.id)}
                                        />
                                        {playingVideo !== project.id && (
                                            <div className="play-overlay" onClick={() => handlePlayVideo(project.id)}>
                                                <FaPlay className="play-icon" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <img src={project.image} alt={project.title} />
                                        <div className="project-overlay">
                                            <div className="project-links">
                                                <a href={project.links.code} className="project-link" title="View Paper" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /></a>
                                                {project.videoId && (
                                                    <a href={`https://www.youtube.com/watch?v=${project.videoId}`} className="project-link" title="Watch Video" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="project-content">
                                <span className="project-category">{project.category}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
