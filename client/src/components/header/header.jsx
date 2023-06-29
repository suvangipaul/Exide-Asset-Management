import React from "react";
import "./header.css";
import img1 from "../../images/img1.jpg";

function Header() {
  return (
    <div>
      <div className="header-content">
        <div className="header-left">
          <img src={img1} alt="" />
        </div>
        <div className="header-middle">
          <h1>DASHBOARD</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
