import React from "react";
import meetuImage from "../assets/meetu.png";
import "./MeetuImage.css";
import * as motion from "motion/react-client";

interface ImageProps {
  dim: string;
}

export const MeetuImage = ({ dim }: ImageProps) => {
  return (
    <motion.div
      className="meetu_border"
      style={{
        width: dim,
        height: dim,
      }}
      animate={{
        "--rotation": ["0deg", "360deg"],
        "--border-size": ["1px", "3px", "1px"],
      }}
      transition={{
        "--rotation": {
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        },
        "--border-size": {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <img
        className="meetu_image"
        src={meetuImage}
        alt="Main Logo"
        height={dim}
        width={dim}
      />
    </motion.div>
  );
};
