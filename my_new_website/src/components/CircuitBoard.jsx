import React, { useEffect, useRef } from 'react';
import './CircuitBoard.css';

const CircuitBoard = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        setCanvasSize();

        // Circuit properties
        const gridSize = 40;
        const nodeRadius = 3;
        let pulses = [];

        // Generate circuit nodes
        const generateNodes = () => {
            const nodes = [];
            const cols = Math.ceil(canvas.width / gridSize) + 1;
            const rows = Math.ceil(canvas.height / gridSize) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    // Random offset for organic look
                    if (Math.random() > 0.6) {
                        nodes.push({
                            x: i * gridSize + (Math.random() - 0.5) * 10,
                            y: j * gridSize + (Math.random() - 0.5) * 10,
                            connections: [],
                            active: Math.random() > 0.7
                        });
                    }
                }
            }

            // Create connections
            nodes.forEach((node, i) => {
                nodes.forEach((other, j) => {
                    if (i !== j) {
                        const dx = node.x - other.x;
                        const dy = node.y - other.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < gridSize * 1.8 && Math.random() > 0.5) {
                            node.connections.push(j);
                        }
                    }
                });
            });

            return nodes;
        };

        let nodes = generateNodes();

        // Create pulse animation
        const createPulse = () => {
            if (nodes.length < 2) return;

            const startNodeIndex = Math.floor(Math.random() * nodes.length);
            const startNode = nodes[startNodeIndex];

            if (startNode.connections.length > 0) {
                const endNodeIndex = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
                const endNode = nodes[endNodeIndex];

                pulses.push({
                    startX: startNode.x,
                    startY: startNode.y,
                    endX: endNode.x,
                    endY: endNode.y,
                    progress: 0,
                    speed: 0.015 + Math.random() * 0.02
                });
            }
        };

        // Draw circuit board
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections (circuit traces)
            ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
            ctx.lineWidth = 1;

            nodes.forEach(node => {
                node.connections.forEach(connIndex => {
                    const other = nodes[connIndex];
                    if (other) {
                        ctx.beginPath();

                        // Draw right-angle lines (circuit style)
                        const midX = (node.x + other.x) / 2;
                        ctx.moveTo(node.x, node.y);

                        if (Math.random() > 0.5) {
                            ctx.lineTo(midX, node.y);
                            ctx.lineTo(midX, other.y);
                        } else {
                            ctx.lineTo(node.x, other.y);
                        }
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw nodes (circuit junctions)
            nodes.forEach(node => {
                // Outer glow for active nodes
                if (node.active) {
                    const gradient = ctx.createRadialGradient(
                        node.x, node.y, 0,
                        node.x, node.y, nodeRadius * 4
                    );
                    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
                    gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, nodeRadius * 4, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }

                // Node core
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = node.active ? 'rgba(37, 99, 235, 0.5)' : 'rgba(37, 99, 235, 0.15)';
                ctx.fill();
            });

            // Draw and update pulses
            pulses = pulses.filter(pulse => {
                pulse.progress += pulse.speed;

                if (pulse.progress >= 1) return false;

                const x = pulse.startX + (pulse.endX - pulse.startX) * pulse.progress;
                const y = pulse.startY + (pulse.endY - pulse.startY) * pulse.progress;

                // Pulse glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
                gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
                gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.3)');
                gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Pulse core
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.fill();

                return true;
            });

            // Randomly create new pulses
            if (Math.random() < 0.03) {
                createPulse();
            }

            // Randomly toggle node states
            if (Math.random() < 0.01) {
                const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
                if (randomNode) randomNode.active = !randomNode.active;
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        // Resize handler
        const handleResize = () => {
            setCanvasSize();
            nodes = generateNodes();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="circuit-board-canvas"
            aria-hidden="true"
        />
    );
};

export default CircuitBoard;
