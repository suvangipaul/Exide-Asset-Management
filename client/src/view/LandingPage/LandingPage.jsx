import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards.jsx";
import Header from "../../components/header/header.jsx";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const [desktop, newDesktop] = useState(0);
  const [laptop, newLaptop] = useState(0);
  const [server, newServer] = useState(0);
  const [printer, newPrinter] = useState(0);
  const [nswitch, newSwitch] = useState(0);

  useEffect(() => {
    fetch("/LandingPage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.map((no, index) => {
          if (index === 0) newDesktop(no);
          else if (index === 1) newLaptop(no);
          else if (index === 2) newServer(no);
          else if (index === 3) newPrinter(no);
          else if (index === 4) newSwitch(no);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="assets">
      <div>
        <Header />
        <Cards
          cards_data={[
            [["Desktops"], [desktop]],
            [["Laptops"], [laptop]],
            [["Servers"], [server]],
            [["Printers"], [printer]],
            [["N/W Switches"], [nswitch]],
          ]}
        />
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
