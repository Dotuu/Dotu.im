import { useEffect, useState, type CSSProperties } from "react";
import "./Typewriter.css";

interface TypewriterProps {
  title: string;
  interval: number;
  fontSize?: string;
  colorFirst: string;
  colorSecond: string;
}

export const Typewriter = ({
  title,
  interval,
  fontSize,
  colorFirst,
  colorSecond,
}: TypewriterProps) => {
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let idx = 0;

    const typeWriter = setInterval(() => {
      setText(title.slice(0, idx));
      idx++;
      if (idx === title.length + 1) {
        clearInterval(typeWriter);
        setCursorVisible(false);
      }
    }, interval);

    return () => clearInterval(typeWriter);
  }, []);

  return (
    <h1
      className="title"
      style={
        {
          ...(fontSize ? { fontSize } : {}),
          "--color-first": colorFirst,
          "--color-second": colorSecond,
        } as CSSProperties
      }
    >
      {text}
      {cursorVisible && <span className="cursor">|</span>}
    </h1>
  );
};
