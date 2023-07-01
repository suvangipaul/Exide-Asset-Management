import React from "react";

// import { Link } from "react-router-dom";
import Card from "./Card/Card";

const Cards = ({ cards_data }) => {
  return (
    <div>
      <ul className="cards">
        {cards_data.map((card, i) => {
          return (
            <li key={i}>
              <Card name={card[0]} number={card[1]} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cards;
