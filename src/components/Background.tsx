import { useEffect, useState, useRef } from "react";
import "./Background.css";

const CELL_SIZE: number = 32;
const FADE_MS: number = 1000;

export const Background = () => {
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });

  const gridRef = useRef(grid);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const cols = Math.floor(window.innerWidth / CELL_SIZE);
      const rows = Math.ceil(window.innerHeight / CELL_SIZE);
      gridRef.current = { cols, rows };
      lastPointRef.current = null;
      setGrid({ cols, rows });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const lightCell = (cx: number, cy: number) => {
      const { cols, rows } = gridRef.current;
      if (cx < 0 || cx >= cols || cy < 0 || cy >= rows) return;

      const el = containerRef.current?.children[cy * cols + cx];
      if (!el) return;

      el.animate(
        [
          { backgroundColor: "rgba(255, 255, 255, 0.9)" },
          { backgroundColor: "rgba(255, 255, 255, 0)" },
        ],
        { duration: FADE_MS, easing: "ease-out" },
      );
    };

    const paintSegment = (x0: number, y0: number, x1: number, y1: number) => {
      const dx = x1 - x0;
      const dy = y1 - y0;

      let cx = Math.floor(x0 / CELL_SIZE);
      let cy = Math.floor(y0 / CELL_SIZE);
      const endCx = Math.floor(x1 / CELL_SIZE);
      const endCy = Math.floor(y1 / CELL_SIZE);

      const stepX = dx > 0 ? 1 : dx < 0 ? -1 : 0;
      const stepY = dy > 0 ? 1 : dy < 0 ? -1 : 0;

      const tDeltaX = dx !== 0 ? Math.abs(CELL_SIZE / dx) : Infinity;
      const tDeltaY = dy !== 0 ? Math.abs(CELL_SIZE / dy) : Infinity;

      const boundaryX = (stepX > 0 ? cx + 1 : cx) * CELL_SIZE;
      const boundaryY = (stepY > 0 ? cy + 1 : cy) * CELL_SIZE;
      let tMaxX = dx !== 0 ? (boundaryX - x0) / dx : Infinity;
      let tMaxY = dy !== 0 ? (boundaryY - y0) / dy : Infinity;

      lightCell(cx, cy);

      const { cols, rows } = gridRef.current;
      let guard = cols + rows + 8;
      while ((cx !== endCx || cy !== endCy) && guard-- > 0) {
        if (tMaxX < tMaxY) {
          if (tMaxX > 1) break;
          cx += stepX;
          tMaxX += tDeltaX;
        } else {
          if (tMaxY > 1) break;
          cy += stepY;
          tMaxY += tDeltaY;
        }
        lightCell(cx, cy);
      }
    };

    const handleMove = (e: PointerEvent) => {
      const coalesced =
        typeof e.getCoalescedEvents === "function"
          ? e.getCoalescedEvents()
          : [];
      const samples = coalesced.length ? coalesced : [e];

      for (const sample of samples) {
        const px = sample.clientX;
        const py = sample.clientY;
        const last = lastPointRef.current;

        if (!last) {
          lightCell(Math.floor(px / CELL_SIZE), Math.floor(py / CELL_SIZE));
        } else {
          paintSegment(last.x, last.y, px, py);
        }

        lastPointRef.current = { x: px, y: py };
      }
    };

    const handleLeave = () => {
      lastPointRef.current = null;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, []);

  return (
    <div
      className="background_container"
      ref={containerRef}
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, ${CELL_SIZE}px)`,
        gridAutoRows: `${CELL_SIZE}px`,
      }}
    >
      {Array.from({ length: grid.cols * grid.rows }).map((_, i) => (
        <div key={i} className="grid_cell" />
      ))}
    </div>
  );
};
