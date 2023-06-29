import React from "react";
import Cards from "../../components/Cards/Cards.jsx";
import Header from "../../components/header/header.jsx";

import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="assets">
      <div>
        <Header />
        <Cards />
      </div>
      <footer>
        <div className="button-container1">
          <Link to="/funcpage" className="link">
            <button className="button">Enter</button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
