import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { House, Camera, ChatTeardropDots, Palette, Sun, Moon } from '@phosphor-icons/react';

const FloatingDock = ({ currentTheme, onThemeChange }) => {
  let mouseX = useMotionValue(Infinity);

  const toggleTheme = () => {
    onThemeChange(currentTheme === 'dark' ? 'cupcake' : 'dark');
  };

  const navItems = [
    { title: 'Home', icon: House, href: '#Home' },
    { title: 'About', icon: Palette, href: '#about' },
    { title: 'Gallery', icon: Camera, href: '#gallery' },
    { title: 'Echoes', icon: ChatTeardropDots, href: '#messages' },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex h-16 items-end gap-4 rounded-3xl bg-base-200/50 px-4 pb-3 backdrop-blur-xl border border-base-content/10 shadow-2xl z-[100]"
    >
      {navItems.map((item, idx) => (
        <IconContainer mouseX={mouseX} key={idx} {...item} />
      ))}
      <div className="h-full w-px bg-base-content/10 mx-1" />
      <motion.button
        onClick={toggleTheme}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
      >
        {currentTheme === 'dark' ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
      </motion.button>
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon: Icon, href }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        className="relative flex items-center justify-center rounded-full bg-base-300 text-base-content hover:bg-primary hover:text-white group transition-colors shadow-lg"
      >
        <Icon size={24} weight="duotone" />
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 rounded-lg bg-neutral px-3 py-1 text-xs text-neutral-content group-hover:scale-100 transition-transform font-bold">
          {title}
        </span>
      </motion.div>
    </a>
  );
}

export default FloatingDock;
