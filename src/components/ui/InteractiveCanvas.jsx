import React, { useState, useRef } from 'react';
import { sfx } from '../../lib/sounds';

const InteractiveCanvas = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const svgRef = useRef(null);

  const handlePointerDown = (e) => {

    if (e.button !== 0 && e.button !== undefined) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPath({ id: Date.now(), points: [{ x, y }] });
    sfx.startDrawing();
  };

  const handlePointerMove = (e) => {
    if (!currentPath) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPath(prev => ({
      ...prev,
      points: [...prev.points, { x, y }]
    }));
    sfx.startDrawing();
  };

  const handlePointerUp = () => {
    sfx.stopDrawing();
    if (currentPath) {
      setPaths(prev => [...prev, currentPath]);
      const idToRemove = currentPath.id;
      setCurrentPath(null);
      

      setTimeout(() => {
        setPaths(prev => prev.filter(p => p.id !== idToRemove));
      }, 3500);
    }
  };

  return (
    <svg
      ref={svgRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="fixed inset-0 w-full h-full z-0 touch-none"
      style={{ 
        cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" style=\"font-size: 24px\"><text y=\"24\">🖍️</text></svg>') 0 24, crosshair"
      }}
    >
      {paths.map(path => (
        <polyline
          key={path.id}
          points={path.points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="var(--fallback-p, oklch(var(--p) / 0.4))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fade-out-drawing"
        />
      ))}
      {currentPath && (
        <polyline
          points={currentPath.points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="var(--fallback-p, oklch(var(--p) / 0.8))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export default InteractiveCanvas;
