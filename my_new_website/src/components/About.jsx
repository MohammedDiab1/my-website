import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaRobot, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import './About.css';

const About = () => {
    const timeline = [
        {
            id: 1,
            role: "Principal Autonomy Engineer",
            org: "All3",
            orgLink: "https://www.all3.com/",
            date: "2025 - Present",
            icon: <FaRobot />,
            desc: "Leading autonomy engineering initiatives and advanced robotics development."
        },
        {
            id: 2,
            role: "Senior Research Engineer",
            org: "Humanoid",
            orgLink: "https://thehumanoid.ai/",
            date: "Nov 2024 - Oct 2025",
            icon: <FaRobot />,
            desc: "Leading research on autonomous dexterous robots and human-robot interaction."
        },
        {
            id: 4,
            role: "Interim Chief Technology Officer (CTO)",
            org: "Stealth AI Start-up",
            orgLink: null,
            date: "2024",
            icon: <FaBriefcase />,
            desc: "Utilized Generative AI to support grant applications across Europe."
        },
        {
            id: 3,
            role: "Principal Research Scientist",
            org: "Stealth Start-up",
            orgLink: null,
            date: "2023 - 2024",
            icon: <FaBriefcase />,
            desc: "Led team investigating RAG systems and Generative AI, focusing on healthcare and financial applications."
        },
        {
            id: 5,
            role: "Assistant Professor",
            org: "University of Plymouth",
            orgLink: "https://www.plymouth.ac.uk",
            date: "2024",
            icon: <FaUniversity />,
            desc: "Conducted research and teaching in robotics and autonomous systems."
        },
        {
            id: 6,
            role: "Senior Postdoctoral Research Associate",
            org: "Imperial College London (PRL)",
            orgLink: "https://www.imperial.ac.uk/personal-robotics",
            date: "2021 - 2023",
            icon: <FaUniversity />,
            desc: "Developed methods for inferring human behavior to enhance trustworthy human-robot interaction in the UK Research Innovation (UKRI) Trust Node project."
        },
        {
            id: 7,
            role: "Visiting Researcher",
            org: "Institute for Artificial Intelligence (IAI), University of Bremen",
            orgLink: "https://ai.uni-bremen.de/",
            date: "2019",
            icon: <FaUniversity />,
            desc: "Short research stay focusing on knowledge representation and semantic reasoning for robotics."
        },
        {
            id: 8,
            role: "Visiting Researcher",
            org: "Third Institute of Physics - Biophysics, Georg-August University Göttingen",
            orgLink: "https://www.uni-goettingen.de/",
            date: "2019",
            icon: <FaUniversity />,
            desc: "Short research stay exploring bio-inspired approaches to robotic manipulation."
        },
        {
            id: 9,
            role: "Ph.D. in Automatic Control, Robotics, and Computer Vision",
            org: "Universitat Politècnica de Catalunya (UPC)",
            orgLink: "https://www.upc.edu",
            date: "2016 - 2021",
            icon: <FaGraduationCap />,
            desc: "Developed cloud-based frameworks and focused on task and motion planning and intelligent perception."
        }
    ];

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </motion.h2>

                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p>
                            I am a <strong>Principal Autonomy Engineer</strong> and Researcher with a strong passion for advancing intelligent and trustworthy autonomous systems. I currently serve as a Principal Autonomy Engineer at <strong>All3</strong>. Previously, I worked as a Senior Research Engineer at <strong>Humanoid</strong>, and held academic positions as an Assistant Professor at the <strong>University of Plymouth</strong> and a Senior Postdoctoral Research Associate at the <strong>Personal Robotics Lab (PRL)</strong> at Imperial College London. I earned my Ph.D. in Automatic Control, Robotics, and Computer Vision from the <strong>Institute of Industrial and Control Engineering (IOC)</strong> at the Universitat Politècnica de Catalunya (UPC).
                        </p>
                        <p>
                            My research bridges <strong>classical robotics and modern AI</strong>, combining task and motion planning, intelligent perception, knowledge representation, and human–robot interaction with <strong>Large Language Models (LLMs)</strong>, <strong>Vision-Language Models (VLMs)</strong>, <strong>Vision-Language-Action Models (VLAs)</strong>, and <strong>neuro-symbolic reasoning</strong>. I focus on building robust and adaptable autonomous systems capable of collaboration, transfer learning across diverse contexts, and effective failure detection, interpretation, and recovery.
                        </p>
                        <p>
                            Beyond robotics, I actively apply <strong>Generative AI</strong> and <strong>Retrieval-Augmented Generation (RAG)</strong> to real-world problems in healthcare and finance. I served as a Principal Research Scientist for a London-based stealth startup, where I led a research team exploring advanced Generative AI systems, and as Interim Chief Technology Officer (CTO) at another stealth AI startup focused on supporting grant applications across Europe using Generative AI.
                        </p>
                        <p>
                            I am also deeply involved in open-source and standardization efforts. As <strong>Open Source Product Manager</strong> of the Autonomous Robots subgroup within the IEEE Working Group on Ontologies for Robotics and Automation (ORA), I contribute to the standardization of robotics and automation ontologies. Additionally, I participate in the SemIoP Expert Group, applying semantic technologies and ontologies within IoT ecosystems.
                        </p>
                        <p>
                            Alongside my research and leadership roles, I work as a <strong>consultant for AI and robotics startups</strong>, helping teams navigate complex technical challenges and bring innovative solutions to market. My overarching goal is to design safe, explainable, and trustworthy autonomous systems that can collaborate effectively with humans across industrial, healthcare, and societal domains.
                        </p>
                    </motion.div>

                    <div className="timeline">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="timeline-item"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            >
                                <div className="timeline-icon">
                                    {item.icon}
                                </div>
                                <div className="timeline-content">
                                    <span className="timeline-date">{item.date}</span>
                                    <h3 className="timeline-role">{item.role}</h3>
                                    {item.orgLink ? (
                                        <h4 className="timeline-org">
                                            <a href={item.orgLink} target="_blank" rel="noopener noreferrer">
                                                {item.org}
                                            </a>
                                        </h4>
                                    ) : (
                                        <h4 className="timeline-org">{item.org}</h4>
                                    )}
                                    <p className="timeline-desc">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
