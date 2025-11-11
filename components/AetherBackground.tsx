'use client';

import { useEffect, useRef } from 'react';

export function AetherBackground() {
  return (
    <div id="aether-bg" className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
      <div className="aether-blob blob-1" />
      <div className="aether-blob blob-2" />
      <div className="aether-blob blob-3" />
      <div className="aether-blob blob-4" />

      <style jsx>{`
        .aether-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          will-change: transform, opacity;
        }

        .blob-1 {
          width: 700px;
          height: 700px;
          top: -20%;
          left: -30%;
          background: #8b5cf6;
          animation: moveBlob1 25s infinite alternate ease-in-out;
        }

        .blob-2 {
          width: 600px;
          height: 600px;
          top: 10%;
          right: -30%;
          background: #3b82f6;
          animation: moveBlob2 30s infinite alternate ease-in-out;
        }

        .blob-3 {
          width: 500px;
          height: 500px;
          bottom: -20%;
          left: 20%;
          background: #10b981;
          animation: moveBlob3 28s infinite alternate ease-in-out;
        }

        .blob-4 {
          width: 400px;
          height: 400px;
          bottom: 10%;
          right: 10%;
          background: #ec4899;
          animation: moveBlob4 22s infinite alternate ease-in-out;
        }

        @keyframes moveBlob1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(150px, 100px) scale(1.1); }
        }

        @keyframes moveBlob2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-100px, 150px) scale(1.05); }
        }

        @keyframes moveBlob3 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, -100px) scale(0.95); }
        }

        @keyframes moveBlob4 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, -50px) scale(1.1); }
        }

        @media (max-width: 768px) {
          .aether-blob { filter: blur(60px); opacity: 0.2; }
          .blob-1 { width: 400px; height: 400px; }
          .blob-2 { width: 350px; height: 350px; }
          .blob-3 { width: 300px; height: 300px; }
          .blob-4 { width: 250px; height: 250px; }
        }
      `}</style>
    </div>
  );
}

export function ParticleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      if (!canvas) return;
      const particleCount = window.innerWidth < 768 ? 50 : 100;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    }

    function animateParticles() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx);
      }

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${Math.min(0.3, 1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-overlay"
      className="fixed top-0 left-0 w-full h-screen z-[1] pointer-events-none"
    />
  );
}
