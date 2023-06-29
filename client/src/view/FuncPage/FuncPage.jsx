import React from "react";
import "./FuncPage.css";

import { Link, Outlet } from "react-router-dom";

function FuncPage() {
  //state variable with useState hook (0)
  //add button, one onclick function, changes state of the variable, changes to 1

  return (
    <>
      <header>
        <div className="navbar">
          <ul className="header-option">
            <li>
              <Link to="addelements">Add</Link>
            </li>

            <li>
              <Link to="editelements">Edit</Link>
            </li>
            <li>
              <Link to="deleteelements">Delete</Link>
            </li>
            <li>
              <Link to="report">Report</Link>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
    // {state && <FormComponent />}
  );
}

export default FuncPage;
