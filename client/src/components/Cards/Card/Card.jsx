import React from "react";
import "./Card.css";
import { motion } from "framer-motion";

const Card = ({ name, number }) => {
  console.log(name, number);
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.2 }}
      onClick={() => {
        document.getElementById(name).click();
      }}
    >
      {/* <img src={image} className="card__image" alt="" /> */}
      <div className="card__overlay">
        <div className="card__header">
          <div className="card__header-text">
            <h3 className="card__title">{name}</h3>
            <h3>{number}</h3>
          </div>
        </div>
      </div>
      <a id={name} style={{ display: "none" }}>
        link
      </a>
    </motion.div>
  );
};

export default Card;
