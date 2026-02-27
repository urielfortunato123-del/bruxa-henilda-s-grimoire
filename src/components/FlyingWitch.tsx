import { useEffect, useState } from "react";

const FlyingWitch = () => {
  const [position, setPosition] = useState({ x: -100, y: 30 });
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  useEffect(() => {
    let animFrame: number;
    let x = -100;
    let y = 30;
    let dir = 1;
    let angle = 0;

    const animate = () => {
      angle += 0.02;
      x += dir * 1.2;
      y = 30 + Math.sin(angle) * 40 + Math.cos(angle * 0.7) * 20;

      if (x > window.innerWidth + 50) {
        dir = -1;
      } else if (x < -120) {
        dir = 1;
      }

      setPosition({ x, y });
      setDirection(dir);
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div
      className="fixed z-50 pointer-events-none select-none"
      style={{
        left: position.x,
        top: position.y,
        transform: `scaleX(${direction})`,
        transition: "transform 0.3s",
        fontSize: "2rem",
        filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))",
      }}
    >
      🧹🧙‍♀️
    </div>
  );
};

export default FlyingWitch;
