"use client";

import React, { useEffect, useRef } from "react";

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    const emojis = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];
    const otherChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
    const fontSize = 32;
    const columns = canvas.width / fontSize;

    const columnChars = Array.from({ length: Math.floor(columns) }, () => {
      return Math.random() < 0.2
        ? {
            char: emojis[Math.floor(Math.random() * emojis.length)],
            isEmoji: true,
          }
        : { char: "", isEmoji: false };
    });

    const drops = Array(Math.floor(columns)).fill(1);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = "bold " + fontSize + "px serif";  // Updated line

      for (let i = 0; i < drops.length; i++) {
        if (!columnChars[i].isEmoji) {
          columnChars[i].char = otherChars.charAt(
            Math.floor(Math.random() * otherChars.length)
          );
        }
        const text = columnChars[i].char;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      setTimeout(() => {
        animationFrameId = requestAnimationFrame(draw);
      }, 50);
    };

    draw();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: 'none',
      }}
    ></canvas>
  );
};

export default MatrixRain;
