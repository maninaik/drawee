'use client';

import { useRef, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Canvas from '@/components/Canvas';

type Shape = 'circle' | 'square' | 'text';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedShape, setSelectedShape] = useState<Shape>('circle');

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    (canvas as any).clear?.();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        onClear={clearCanvas}
      />
      <Canvas ref={canvasRef} selectedShape={selectedShape} />
    </div>
  );
}
