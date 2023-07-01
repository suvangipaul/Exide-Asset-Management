import React, { useState, useEffect } from "react";
import "./AddElements.css";
import axios from "axios";

const AddElements = () => {
  const [type, setType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [noOfYears, setNoOfYears] = useState("");
  const [autoInput, setAutoInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [generatedAutoInput, setGeneratedAutoInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const generatedAutoInput = `${type} ${make} ${model} ${serialNo} ${dateOfPurchase} ${noOfYears}`;
    setAutoInput(generatedAutoInput);

    // Show the popup message
    setShowPopup(true);

    const data = {
      type: type,
      make: make,
      model: model,
      serialNo: serialNo,
      dateOfPurchase: dateOfPurchase,
      noOfYears: noOfYears,
      autoInput: autoInput,
    };

    //   fetch("/FuncPage/addelements", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err));

    //   // Reset the form inputs
    //   setType("");
    //   setMake("");
    //   setModel("");
    //   setSerialNo("");
    //   setDateOfPurchase("");
    //   setNoOfYears("");
    // };

    axios
      .post(
        "https://exide-asset-management.onrender.com/FuncPage/addelements",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Reset the form inputs
    setType("");
    setMake("");
    setModel("");
    setSerialNo("");
    setDateOfPurchase("");
    setNoOfYears("");
  };

  const handleCancel = () => {
    // Reset the form inputs
    setType("");
    setMake("");
    setModel("");
    setSerialNo("");
    setDateOfPurchase("");
    setNoOfYears("");
  };

  const handleModelChange = (e) => {
    const inputValue = e.target.value;
    const uppercaseValue = inputValue.toUpperCase();
    setModel(uppercaseValue);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      setShowPopup(false);
    };

    const handleClick = () => {
      setShowPopup(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const generatedAutoInput = `${type} / ${make} / ${model} / ${serialNo} / ${dateOfPurchase} / ${noOfYears}`;
    setAutoInput(generatedAutoInput);
  }, [type, make, model, serialNo, dateOfPurchase, noOfYears]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="Laptop">Laptops</option>
            <option value="Desktop">Desktops</option>
            <option value="Server">Servers</option>
            <option value="Printer">Printers</option>
            <option value="N-W Switches">N-W Switches</option>
          </select>
        </label>
        <br />

        <label>
          Make:
          <select value={make} onChange={(e) => setMake(e.target.value)}>
            <option value="">Select Make</option>
            <option value="HP">HP</option>
            <option value="DELL">Dell</option>
          </select>
        </label>
        <br />

        <label>
          Model:
          <input type="text" value={model} onChange={handleModelChange} />
        </label>
        <br />

        <label>
          Serial No.:
          <input
            type="number"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
          />
        </label>
        <br />

        <label>
          Date of Purchase:
          <input
            type="date"
            value={dateOfPurchase}
            onChange={(e) => setDateOfPurchase(e.target.value)}
          />
        </label>
        <br />

        <label>
          No. of Years:
          <input
            type="number"
            value={noOfYears}
            onChange={(e) => setNoOfYears(e.target.value)}
          />
        </label>
        <br />

        <div className="auto-input-field">
          <label>Asset Tag</label>
          <input type="text" value={autoInput} readOnly />
        </div>
        <br />

        <div className="button-container">
          <button type="submit">Submit</button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="popup">
          <p>Added Successfully!</p>
        </div>
      )}
    </div>
  );
};

export default AddElements;
