import { useEffect, useRef } from "react";

const MagicalEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Twinkling stars (fixed position, pulsing glow)
    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1.5,
      speed: Math.random() * 2.5 + 1.5,
      phase: Math.random() * Math.PI * 2,
      maxOpacity: Math.random() * 0.6 + 0.4,
    }));

    // Candle flames
    const candles = Array.from({ length: 4 }, () => ({
      x: Math.random() * (window.innerWidth - 40) + 20,
      y: window.innerHeight - 30 - Math.random() * 60,
    }));

    let frame: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      // Draw twinkling stars
      stars.forEach((s) => {
        const twinkle = (Math.sin(t * s.speed + s.phase) + 1) / 2;
        const alpha = s.maxOpacity * (0.3 + twinkle * 0.7);
        const glowSize = s.size * (4 + twinkle * 5);

        // Star glow
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowSize);
        grad.addColorStop(0, `rgba(255, 235, 160, ${alpha})`);
        grad.addColorStop(0.3, `rgba(255, 210, 100, ${alpha * 0.5})`);
        grad.addColorStop(0.6, `rgba(255, 180, 60, ${alpha * 0.15})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Star core - 4 pointed
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = `rgba(255, 235, 180, ${alpha})`;
        for (let i = 0; i < 4; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.ellipse(0, 0, s.size * 0.3, s.size * 1.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Draw candles
      candles.forEach((c) => {
        // Candle body
        ctx.fillStyle = "rgba(180, 140, 100, 0.25)";
        ctx.beginPath();
        ctx.roundRect(c.x - 4, c.y, 8, 22, 2);
        ctx.fill();

        // Wick
        ctx.strokeStyle = "rgba(80, 60, 40, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x, c.y - 4);
        ctx.stroke();

        // Flame flicker
        const flicker = Math.sin(t * 8 + c.x) * 1.5;
        const flicker2 = Math.cos(t * 6 + c.y) * 1;
        const fx = c.x + flicker;
        const fy = c.y - 6;

        // Outer glow
        const glow = ctx.createRadialGradient(fx, fy - 6, 0, fx, fy - 4, 18);
        glow.addColorStop(0, "rgba(255, 180, 50, 0.15)");
        glow.addColorStop(0.5, "rgba(255, 120, 30, 0.05)");
        glow.addColorStop(1, "rgba(255, 80, 20, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(fx, fy - 6, 18, 0, Math.PI * 2);
        ctx.fill();

        // Flame outer
        ctx.fillStyle = "rgba(255, 140, 30, 0.5)";
        ctx.beginPath();
        ctx.ellipse(fx, fy - 4, 3.5 + flicker2 * 0.3, 7 + flicker * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Flame inner
        ctx.fillStyle = "rgba(255, 220, 100, 0.7)";
        ctx.beginPath();
        ctx.ellipse(fx, fy - 2, 1.8, 4.5 + flicker * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Flame tip
        ctx.fillStyle = "rgba(255, 255, 200, 0.6)";
        ctx.beginPath();
        ctx.ellipse(fx, fy - 6 + flicker2, 0.8, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

export default MagicalEffects;
