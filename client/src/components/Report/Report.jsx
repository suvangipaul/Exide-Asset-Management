import React, { useState, useEffect } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import "./Report.css";

const Report = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/reports"); // Replace with your API endpoint
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

  // useEffect(() => {
  //   if (selectedType === "All") {
  //     setFilteredData(data);
  //   } else {
  //     const filtered = data.filter((item) => item.type === selectedType);
  //     setFilteredData(filtered);
  //   }
  // }, [data, selectedType]);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    const data = {
      value: type,
    };

    fetch("/FuncPage/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setFilteredData(data);
      })
      .catch((err) => console.log(err));
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      padding: "1cm",
    },
    title: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: "bold",
    },
    table: {
      display: "table",
      width: "100%", // Set the width to 100% for symmetry
      borderStyle: "solid", // Add border style for symmetry
      borderWidth: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      flex: 1, // Set flex to 1 for equal width cells
      borderWidth: 1,
      borderColor: "#000",
      padding: 5,
    },
  });

  const PDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Assets Present</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Type of Asset</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Manufacturer</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Model No.</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Serial No.</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Date of Purchase</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>No. of Years</Text>
            </View>
          </View>
          {filteredData.map((item, index) => (
            // const store = item.split('/')
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{item.split("/")[0]}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.split("/")[1]}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.split("/")[2]}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.split("/")[3]}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.split("/")[4]}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.split("/")[5]}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const csvData = filteredData.map((item) => ({
    "Type of Asset": item.split("/")[0],
    Manufacturer: item.split("/")[1],
    "Model No.": item.split("/")[2],
    "Serial No.": item.split("/")[3],
    "Date of Purchase": item.split("/")[4],
    "No. of Years": item.split("/")[5],
  }));

  return (
    <div className="report-container">
      <h1>Assets Present</h1>
      <div className="filter-container">
        <label htmlFor="typeFilter">Filter by Type:</label>
        <select
          id="typeFilter"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Select a Type</option>
          <option value="All">All</option>
          <option value="Laptop">Laptops</option>
          <option value="Desktop">Desktops</option>
          <option value="Server">Servers</option>
          <option value="Printer">Printers</option>
          <option value="N-W Switches">N-W Switches</option>
        </select>
      </div>
      <table className="report-table">
        <thead>
          <tr>
            <th>Type of Asset</th>
            <th>Manufacturer</th>
            <th>Model No.</th>
            <th>Serial No.</th>
            <th>Date of Purchase</th>
            <th>No. of Years</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.split("/")[0]}</td>
              <td>{item.split("/")[1]}</td>
              <td>{item.split("/")[2]}</td>
              <td>{item.split("/")[3]}</td>
              <td>{item.split("/")[4]}</td>
              <td>{item.split("/")[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="export-button-container">
        <PDFDownloadLink document={<PDFDocument />} fileName="report.pdf">
          {({ blob, url, loading, error }) => (
            <button className="export-button">
              {loading ? "Loading document..." : "Export to PDF"}
            </button>
          )}
        </PDFDownloadLink>
        <CSVLink data={csvData} filename="report.csv">
          <button className="export-button">Export to Excel</button>
        </CSVLink>
      </div>
    </div>
  );
};

export default Report;
