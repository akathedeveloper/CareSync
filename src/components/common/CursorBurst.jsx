import { useEffect } from "react";

const CursorBurst = () => {
  useEffect(() => {
    const trailDots = [];
    const trailCount = 8;

    // Create trailing dots
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement("div");
      dot.className =
        "magic-cursor-dot fixed w-2 h-2 bg-pink-500 rounded-full pointer-events-none opacity-80 z-50 transition-transform duration-75";
      document.body.appendChild(dot);
      trailDots.push(dot);
    }

    // Initialize mouse position to center of the viewport
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = Array(trailCount).fill(mouseX);
    let trailY = Array(trailCount).fill(mouseY);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Trail animation function
    const animateTrail = () => {
      trailX[0] += (mouseX - trailX[0]) * 0.3;
      trailY[0] += (mouseY - trailY[0]) * 0.3;
      trailDots[0].style.transform = `translate3d(${trailX[0]}px, ${trailY[0]}px, 0)`;

      for (let i = 1; i < trailCount; i++) {
        trailX[i] += (trailX[i - 1] - trailX[i]) * 0.3;
        trailY[i] += (trailY[i - 1] - trailY[i]) * 0.3;
        trailDots[i].style.transform = `translate3d(${trailX[i]}px, ${trailY[i]}px, 0)`;
      }

      requestAnimationFrame(animateTrail);
    };

    // Burst effect on click
    const colors = ["#ec4899", "#6366f1", "#22c55e", "#f97316", "#eab308"];
    const onClick = (e) => {
      for (let i = 0; i < 10; i++) {
        const burst = document.createElement("div");
        burst.className =
          "fixed w-2 h-2 rounded-full pointer-events-none z-50 opacity-80";
        burst.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        burst.style.left = `${e.clientX}px`;
        burst.style.top = `${e.clientY}px`;
        document.body.appendChild(burst);

        const angle = Math.random() * 2 * Math.PI;
        const distance = 30 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        burst.animate(
          [
            { transform: "translate(0,0)", opacity: 1 },
            { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
          ],
          {
            duration: 600 + Math.random() * 400,
            easing: "ease-out",
            fill: "forwards"
          }
        );

        setTimeout(() => burst.remove(), 1000);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    animateTrail();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      trailDots.forEach((dot) => dot.remove());
    };
  }, []);

  return null; // This component only manipulates DOM directly
};

export default CursorBurst;