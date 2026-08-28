import { useEffect, useRef, useState } from "react";

const BALL_SIZE = 80;
const MAX_SPEED = 30;
const FRICTION = 0.99;
const BOUNCE = 1;

function App() {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - BALL_SIZE / 2,
    y: window.innerHeight / 2 - BALL_SIZE / 2,
  });

  const velocity = useRef({ vx: 0, vy: 0 });
  const animationRef = useRef(0);

  const startPos = useRef({
    x: 0,
    y: 0,
  });

  const [unreadCount, setUnreadCount] = useState(0);

  // ------------------------
  // Badge + Title Sync
  // ------------------------
  useEffect(() => {
    async function syncBadge() {
      try {
        if ("setAppBadge" in navigator) {
          if (unreadCount > 0) {
            await navigator.setAppBadge(unreadCount);
          } else {
            await navigator.clearAppBadge();
          }
        }
      } catch (err) {
        console.error("Badge API error:", err);
      }

      document.title =
        unreadCount > 0
          ? `(${unreadCount}) MyChat`
          : "MyChat";
    }

    syncBadge();
  }, [unreadCount]);

  // ------------------------
  // Physics Loop
  // ------------------------
  useEffect(() => {
    const animate = () => {
      setPosition((prev) => {
        let newX = prev.x + velocity.current.vx;
        let newY = prev.y + velocity.current.vy;

        // RIGHT collision
        if (newX + BALL_SIZE >= window.innerWidth) {
          newX = window.innerWidth - BALL_SIZE;
          velocity.current.vx *= -BOUNCE;
        }

        // LEFT collision
        if (newX <= 0) {
          newX = 0;
          velocity.current.vx *= -BOUNCE;
        }

        // BOTTOM collision
        if (newY + BALL_SIZE >= window.innerHeight) {
          newY = window.innerHeight - BALL_SIZE;
          velocity.current.vy *= -BOUNCE;
        }

        // TOP collision
        if (newY <= 0) {
          newY = 0;
          velocity.current.vy *= -BOUNCE;
        }

        // Friction
        velocity.current.vx *= FRICTION;
        velocity.current.vy *= FRICTION;

        return {
          x: newX,
          y: newY,
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // ------------------------
  // Drag Start
  // ------------------------
  const dragStartFun = (e : React.DragEvent<HTMLDivElement>) => {
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  // ------------------------
  // Drag End
  // ------------------------
  const dragEndFun = (e: React.DragEvent<HTMLDivElement>): void => {
    const dx = startPos.current.x - e.clientX;
    const dy = startPos.current.y - e.clientY;

    let vx = dx * 0.3;
    let vy = dy * 0.3;

    vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, vx));
    vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, vy));

    velocity.current = { vx, vy };
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background: "#111",
      }}
    >
      <div
        draggable
        onDragStart={dragStartFun}
        onDragEnd={dragEndFun}
        style={{
          width: `${BALL_SIZE}px`,
          height: `${BALL_SIZE}px`,
          borderRadius: "50%",
          background: "red",
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          userSelect: "none",
        }}
      >
        BALL
      </div>

      <div
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          display: "flex",
          gap: 10,
        }}
      >
      <h1>Jenkins Test</h1>
      </div>
    </div>
  );
}

export default App;