import React from "react";

// import { Link } from "react-router-dom";
import Card from "./Card/Card";
import { cards_data } from "./cards_data";

const Cards = ({ assets }) => {
  return (
    <div>
      <ul className="cards">
        {cards_data.map((card, i) => {
          return (
            <li key={i}>
              <Card name={card.name} number={card.number} url={card.url} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cards;
