import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);



  useEffect(() => {
    const cursor = cursorRef.current;
    const trails = Array.from({ length: 8 }).map(() => {
      const el = document.createElement("div");
      el.className = "trail";
      document.body.appendChild(el);
      return el;
    });
    trailRefs.current = trails;

    let mouseX = 0;
    let mouseY = 0;
    const positions = Array(trails.length).fill({ x: 0, y: 0 });

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      let x = mouseX;
      let y = mouseY;

      positions.forEach((pos, i) => {
        const nextPos = {
          x: pos.x + (x - pos.x) * 0.25,
          y: pos.y + (y - pos.y) * 0.25,
        };
        positions[i] = nextPos;
        trails[i].style.transform = `translate(${nextPos.x}px, ${nextPos.y}px)`;
        trails[i].style.opacity = (trails.length - i) / trails.length;
        trails[i].style.transition = "transform 0.08s ease";
        x = nextPos.x;
        y = nextPos.y;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      trails.forEach((t) => t.remove());
    };
  }, []);


  return (
    <div
      ref={cursorRef}
      className=" hidden top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999]"
    ></div>
  );
};

export default CustomCursor;
