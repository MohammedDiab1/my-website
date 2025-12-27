import React, { useEffect, useRef } from 'react';
import './NeuralNetwork.css';

const NeuralNetwork = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null });
    const nodesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Node class
        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.baseRadius = this.radius;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update() {
                // Movement
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Pulse effect
                this.pulsePhase += 0.02;
                this.radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.5;

                // Mouse interaction
                const mouse = mouseRef.current;
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const force = (150 - dist) / 150;
                        this.x -= dx * force * 0.02;
                        this.y -= dy * force * 0.02;
                    }
                }
            }

            draw() {
                // Glow effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius * 3
                );
                gradient.addColorStop(0, 'rgba(37, 99, 235, 0.8)');
                gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.3)');
                gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.fill();
            }
        }

        // Initialize nodes
        const nodeCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        nodesRef.current = [];
        for (let i = 0; i < nodeCount; i++) {
            nodesRef.current.push(new Node());
        }

        // Draw connections between nodes
        const drawConnections = () => {
            const nodes = nodesRef.current;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.5;

                        // Create gradient line
                        const gradient = ctx.createLinearGradient(
                            nodes[i].x, nodes[i].y,
                            nodes[j].x, nodes[j].y
                        );
                        gradient.addColorStop(0, `rgba(37, 99, 235, ${opacity})`);
                        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 0.7})`);
                        gradient.addColorStop(1, `rgba(37, 99, 235, ${opacity})`);

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = opacity * 2;
                        ctx.stroke();
                    }
                }
            }
        };

        // Draw data flow animation
        let flowParticles = [];
        const createFlowParticle = () => {
            const nodes = nodesRef.current;
            if (nodes.length < 2) return;

            const startNode = nodes[Math.floor(Math.random() * nodes.length)];
            let endNode;
            let minDist = Infinity;

            // Find a nearby node
            for (const node of nodes) {
                if (node === startNode) continue;
                const dx = startNode.x - node.x;
                const dy = startNode.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150 && dist < minDist) {
                    minDist = dist;
                    endNode = node;
                }
            }

            if (endNode) {
                flowParticles.push({
                    startX: startNode.x,
                    startY: startNode.y,
                    endX: endNode.x,
                    endY: endNode.y,
                    progress: 0,
                    speed: 0.02 + Math.random() * 0.02
                });
            }
        };

        const updateFlowParticles = () => {
            flowParticles = flowParticles.filter(p => {
                p.progress += p.speed;
                if (p.progress >= 1) return false;

                const x = p.startX + (p.endX - p.startX) * p.progress;
                const y = p.startY + (p.endY - p.startY) * p.progress;

                // Draw flowing particle
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
                gradient.addColorStop(0, 'rgba(96, 165, 250, 1)');
                gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.5)');
                gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                return true;
            });
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodesRef.current.forEach(node => {
                node.update();
            });

            drawConnections();

            nodesRef.current.forEach(node => {
                node.draw();
            });

            // Flow particles
            if (Math.random() < 0.1) {
                createFlowParticle();
            }
            updateFlowParticles();

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Mouse move handler
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: null, y: null };
        };

        // Resize handler
        const handleResize = () => {
            setCanvasSize();
            // Reinitialize nodes for new size
            const newNodeCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
            while (nodesRef.current.length < newNodeCount) {
                nodesRef.current.push(new Node());
            }
            while (nodesRef.current.length > newNodeCount) {
                nodesRef.current.pop();
            }
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="neural-network-canvas"
            aria-hidden="true"
        />
    );
};

export default NeuralNetwork;
