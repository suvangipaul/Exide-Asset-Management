import React, { useEffect, useState } from "react";
import "./EditElements.css";
import axios from "axios";

const EditElements = () => {
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
  const [successMessage, setSuccessMessage] = useState("");

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
  // useEffect(() => {
  //   fetch("/FuncPage/editelements", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     // .then((data) => console.log(data))
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://exide-asset-management.onrender.com/FuncPage/editelements"
        );
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
    //console.log(selectedValue.split(" / "));
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

    const data = {
      value: selectedValue,
    };

    //   fetch("/FuncPage/editelements", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err));
    // };

    axios
      .post(
        "https://exide-asset-management.onrender.com/FuncPage/editelements",
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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formValue);
  };

  const handleEditClick = () => {
    // Enable editing of the form value
    setShowForm(true);
    const generatedAutoInput = `${type} / ${make} / ${model} / ${serialNo} / ${dateOfPurchase} / ${noOfYears}`;
    setAutoInput(generatedAutoInput);
    const store = selectedItem.split(" / ");
    const generatedInput = `${store[0]} / ${store[1]} / ${store[2]} / ${store[3]} / ${store[4]} / ${store[5]}`;

    const data = {
      type: type,
      make: make,
      model: model,
      serialNo: serialNo,
      dateOfP: dateOfPurchase,
      noOfYears: noOfYears,
      assetTagFinal: generatedAutoInput,
      assetTag: generatedInput,
    };

    //   fetch("/FuncPage/editelements", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       showSuccessMessage(); // Display success message
    //       setTimeout(() => {
    //         window.location.reload(); // Refresh the page
    //       }, 1000); // Wait for 1 seconds before refreshing
    //     })
    //     .catch((err) => console.log(err));
    //   // .then((data) => console.log(data))
    //   // .catch((err) => console.log(err));
    // };

    axios
      .put("/FuncPage/editelements", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        showSuccessMessage(); // Display success message
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 1000); // Wait for 1 second before refreshing
      })
      .catch((error) => {
        console.log(error);
      });
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

  const showSuccessMessage = () => {
    setSuccessMessage("Update successful!");
  };

  //console.log(data);

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
      {successMessage && (
        <div className="popup">
          <p>{successMessage}</p>{" "}
        </div>
      )}
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
            <button type="button" onClick={handleEditClick}>
              Edit
            </button>
            <button type="buttton" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditElements;
