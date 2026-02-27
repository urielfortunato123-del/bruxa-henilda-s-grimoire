import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import witchImg from "@/assets/flying-witch.png";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
        >
          <motion.img
            src={witchImg}
            alt="Bruxa Henilda"
            className="w-24 h-24 object-contain mb-6"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 20px hsl(38 55% 50% / 0.5))" }}
          />
          <h1 className="font-cinzel text-xl font-semibold text-primary mb-3">
            Bruxa Henilda
          </h1>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
