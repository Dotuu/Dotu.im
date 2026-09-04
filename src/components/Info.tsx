import { useEffect, useState } from "react";
import "./Info.css";

const getEstTime = () =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  }).format(new Date());

export const Info = () => {
  const [time, setTime] = useState(getEstTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getEstTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="info">
      <span className="info_item">
        <span className="info_emoji" aria-hidden="true">
          🇨🇦
        </span>
        Canada
      </span>
      <span className="info_divider" aria-hidden="true" />
      <span className="info_item">
        <span className="info_emoji" aria-hidden="true">
          🕒
        </span>
        {time} EST
      </span>
      <span className="info_divider" aria-hidden="true" />
      <a
        className="info_item info_link"
        href="https://meeu.me/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="info_emoji" aria-hidden="true">
          💜
        </span>
        Psst, check out my wife's website
      </a>
    </div>
  );
};
