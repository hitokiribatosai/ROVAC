
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const GlowButton: React.FC<{ 
  children: React.ReactNode; 
  primary?: boolean; 
  className?: string;
  onClick?: () => void;
}> = ({ children, primary, className = "", onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden px-8 py-3.5 rounded-full font-semibold transition-all duration-300 ${
        primary 
        ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20" 
        : "bg-white border border-slate-200 text-slate-700 hover:border-teal-400"
      } ${className}`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle 80px at ${position.x}px ${position.y}px, ${primary ? 'rgba(255,255,255,0.2)' : 'rgba(0,191,165,0.05)'}, transparent)`
            : 'none'
        }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}> = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className="group p-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-3xl transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 scale-150 transition-all duration-500 transform translate-x-4 -translate-y-4">
        {icon}
      </div>
      <div className="mb-6 p-4 bg-teal-50 w-fit rounded-2xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
      
      <div className="mt-6 flex items-center text-teal-600 font-medium text-sm group-hover:gap-2 transition-all">
        Learn More <span>→</span>
      </div>
    </motion.div>
  );
};
