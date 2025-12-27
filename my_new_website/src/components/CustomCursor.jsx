import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorTrailRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const trailPoints = useRef([]);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorTrail = cursorTrailRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let trailX = 0;
        let trailY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            setIsVisible(true);

            // Add point to trail
            trailPoints.current.push({
                x: mouseX,
                y: mouseY,
                alpha: 1,
                size: 3
            });

            // Limit trail length
            if (trailPoints.current.length > 30) {
                trailPoints.current.shift();
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Animate cursor with smooth follow
        const animate = () => {
            // Smooth cursor follow
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            // Even smoother trail follow
            trailX += (mouseX - trailX) * 0.08;
            trailY += (mouseY - trailY) * 0.08;

            if (cursor) {
                cursor.style.left = `${cursorX}px`;
                cursor.style.top = `${cursorY}px`;
            }

            if (cursorTrail) {
                cursorTrail.style.left = `${trailX}px`;
                cursorTrail.style.top = `${trailY}px`;
            }

            // Draw particle trail on canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw trail points
            for (let i = trailPoints.current.length - 1; i >= 0; i--) {
                const point = trailPoints.current[i];
                point.alpha -= 0.03;
                point.size -= 0.05;

                if (point.alpha <= 0) {
                    trailPoints.current.splice(i, 1);
                    continue;
                }

                // Draw glowing particle
                const gradient = ctx.createRadialGradient(
                    point.x, point.y, 0,
                    point.x, point.y, point.size * 3
                );
                gradient.addColorStop(0, `rgba(96, 165, 250, ${point.alpha})`);
                gradient.addColorStop(0.5, `rgba(59, 130, 246, ${point.alpha * 0.5})`);
                gradient.addColorStop(1, `rgba(37, 99, 235, 0)`);

                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Draw connecting lines between recent points
            if (trailPoints.current.length > 1) {
                ctx.beginPath();
                ctx.moveTo(trailPoints.current[0].x, trailPoints.current[0].y);

                for (let i = 1; i < trailPoints.current.length; i++) {
                    const point = trailPoints.current[i];
                    ctx.lineTo(point.x, point.y);
                }

                ctx.strokeStyle = `rgba(59, 130, 246, 0.3)`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('resize', setCanvasSize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('resize', setCanvasSize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="cursor-trail-canvas"
                aria-hidden="true"
            />
            <div
                ref={cursorTrailRef}
                className={`cursor-trail ${isVisible ? 'visible' : ''}`}
            />
            <div
                ref={cursorRef}
                className={`custom-cursor ${isVisible ? 'visible' : ''}`}
            >
                <div className="cursor-core" />
                <div className="cursor-ring" />
            </div>
        </>
    );
};

export default CustomCursor;
