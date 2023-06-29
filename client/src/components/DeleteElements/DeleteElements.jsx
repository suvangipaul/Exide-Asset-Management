import React, { useEffect, useState } from "react";
import "./DeleteElements.css";

const DeleteElements = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formValue, setFormValue] = useState("");
  const [type, setType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [noOfYears, setNoOfYears] = useState("");
  const [autoInput, setAutoInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show the popup message
    setShowPopup(true);
  };

  const handleModelChange = (e) => {
    const inputValue = e.target.value;
    const uppercaseValue = inputValue.toUpperCase();
    setModel(uppercaseValue);
  };

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/FuncPage/editelements");
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const json = await response.json();

        setData(json);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderArrayElements = () => {
    const elements = [];

    data.forEach((item, index) => {
      elements.push(<option value={item}>{item}</option>);
    });

    return elements;
  };

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedItem(selectedValue);
    console.log(selectedValue.split(" / "));
    const store = selectedValue.split(" / ");
    setType(store[0]);
    setMake(store[1]);
    setModel(store[2]);
    setSerialNo(store[3]);
    setDateOfPurchase(store[4]);
    setNoOfYears(store[5]);

    if (selectedValue === "") {
      setType("");
      setMake("");
      setModel("");
      setSerialNo("");
      setDateOfPurchase("");
      setNoOfYears("");
    }

    /* if (selectedValue !== "") {
      setShowForm(true);
      setFormValue(selectedValue);

      console.log(selectedItem);
    } else {
      setShowForm(false);
      setFormValue("");
    }*/

    const data = {
      value: selectedValue,
    };

    fetch("/FuncPage/editelements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formValue);
  };

  const handleDeleteClick = () => {
    // Perform delete operation here
    // You can use the selectedItem or any other relevant state values for deletion
    console.log("Delete clicked:", selectedItem);

    const store = selectedItem.split(" / ");
    const generatedInput = `${store[0]} / ${store[1]} / ${store[2]} / ${store[3]} / ${store[4]} / ${store[5]}`;

    const data = { assetTag: generatedInput };

    fetch("/FuncPage/deleteelements", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowPopup(true);
        // Refresh the page after the delete operation
        window.location.reload();
      })
      .catch((err) => console.log(err));
    // .then((data) => console.log(data))
    // .catch((err) => console.log(err));
  };

  const handleCancelClick = () => {
    // Clear the form and disable editing
    setShowForm(false);
    const store = selectedItem.split(" / ");
    setType(store[0]);
    setMake(store[1]);
    setModel(store[2]);
    setSerialNo(store[3]);
    setDateOfPurchase(store[4]);
    setNoOfYears(store[5]);
  };

  console.log(data);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div>
        <label>
          Select Asset Tag:
          <select value={selectedItem} onChange={handleDropdownChange}>
            <option value="">Select an item</option>
            {renderArrayElements()}
          </select>
        </label>
      </div>

      <div>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
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
          {/* {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Edit Form Value:
            <input
              type="text"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
          </label> */}

          <div className="button-container">
            <button type="button" onClick={handleDeleteClick}>
              Delete
            </button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div>
            <h3>Deleted Successfully</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteElements;
