import { useEffect, useState } from "react";
import witchImg from "@/assets/flying-witch.png";

const FlyingWitch = () => {
  const [position, setPosition] = useState({ x: -100, y: 30 });
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    let animFrame: number;
    let x = -100;
    let y = 30;
    let dir = 1;
    let angle = 0;

    const animate = () => {
      angle += 0.015;
      x += dir * 1;
      y = 50 + Math.sin(angle) * 35 + Math.cos(angle * 0.6) * 20;

      if (x > window.innerWidth + 60) {
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
      }}
    >
      <img
        src={witchImg}
        alt="Bruxinha voando"
        className="w-16 h-16 object-contain drop-shadow-lg"
        style={{
          filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.4))",
        }}
      />
    </div>
  );
};

export default FlyingWitch;
