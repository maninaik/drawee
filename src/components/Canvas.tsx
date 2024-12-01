'use client';

import { forwardRef, useEffect, useRef, ForwardedRef, useLayoutEffect } from 'react';

type Shape = 'circle' | 'square' | 'text';

interface CanvasProps {
  selectedShape: Shape;
}

const Canvas = forwardRef(function Canvas(
  { selectedShape }: CanvasProps,
  forwardedRef: ForwardedRef<HTMLCanvasElement>
) {
  const localCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const canvasRef = (forwardedRef as React.RefObject<HTMLCanvasElement>) || localCanvasRef;

  useLayoutEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth - 250; // sidebar
      canvasRef.current.height = window.innerHeight - 40; // padding
    }
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#1a1a1a'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    ctx.strokeStyle = '#fff'; 
    ctx.lineWidth = 2;
  },  [canvasRef]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedShape === 'text') {
      const text = prompt('Enter text:', '');
      if (text) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText(text, x, y);
      }
    } else {
      ctx.beginPath();
      if (selectedShape === 'circle') {
        ctx.arc(x, y, 30, 0, Math.PI * 2);
      } else if (selectedShape === 'square') {
        ctx.rect(x - 30, y - 30, 60, 60);
      }
      ctx.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  
  useEffect(() => {
    
    if (canvasRef.current) {
      (canvasRef.current as any).clear = clearCanvas;
    }
  }, []);

  return (
    <div className="flex-1 p-5 bg-[#1a1a1a]">
      <canvas
        ref={canvasRef}
        className="border border-gray-600 rounded-lg"
        onClick={startDrawing}
      />
    </div>
  );
});


export default Canvas;
