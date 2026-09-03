import { useEffect, useState } from "react";
import "./Header.css";

const title: string = "Dotu.im";
const interval: number = 300;

export const Header = () => {
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
    <h1 className="title">
      {text}
      {cursorVisible && <span className="cursor">|</span>}
    </h1>
  );
};
