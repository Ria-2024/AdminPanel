// src/pages/Users.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE } from "./constant";
import "./Users.css"; // Import the CSS file
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_BASE}/getusers`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Function to convert data to CSV format
const convertToCSV = (data) => {
  const headers = [
    "Name",
    "ProfileFor",
    "Community",
    "Email",
    "Gender",
    "Intention",
    "Height",
    "Job Title",
    "Personality",
    "Hobbies",
    "Drinks",
    "Smokes",
    "City",
    "State",
    "DobYear",
    "Religion",
    "Diet",
    "Marital Status",
    "Immigration Status",
  ];

  const csvRows = [];

  // Add headers row
  csvRows.push(headers.join(","));

  // Helper function to escape commas and quotes
  const escapeCSVValue = (value) => {
    if (typeof value === "string") {
      // Escape double quotes by replacing them with two double quotes
      value = value.replace(/"/g, '""');
      // If value contains a comma, wrap it in double quotes
      if (value.includes(",") || value.includes("\n")) {
        return `"${value}"`;
      }
    }
    return value;
  };

  // Add data rows
  data.forEach((item) => {
    const row = [
      escapeCSVValue(`${item.firstName || "N/A"} ${item.lastName || "N/A"}`), // Name
      escapeCSVValue(item.profileFor || "N/A"), // ProfileFor
      escapeCSVValue(item.community || "N/A"), // Community
      escapeCSVValue(item.email || "N/A"), // Email
      escapeCSVValue(item.gender || "N/A"), // Gender
      escapeCSVValue(item.intention || "N/A"), // Intention
      escapeCSVValue(item.height || "N/A"), // Height
      escapeCSVValue(item.jobTitle || "N/A"), // Job Title
      escapeCSVValue(Array.isArray(item.personality) ? item.personality.join(", ") : "N/A"), // Personality
      escapeCSVValue(Array.isArray(item.hobbies) ? item.hobbies.join(", ") : "N/A"), // Hobbies
      escapeCSVValue(item.drinks || "N/A"), // Drinks
      escapeCSVValue(item.smokes || "N/A"), // Smokes
      escapeCSVValue(item.city || "N/A"), // City
      escapeCSVValue(item.state || "N/A"), // State
      escapeCSVValue(item.dobYear || "N/A"), // DobYear
      escapeCSVValue(item.religion || "N/A"), // Religion
      escapeCSVValue(item.diet || "N/A"), // Diet
      escapeCSVValue(item.previousMaritalStatus || "N/A"), // Marital Status
      escapeCSVValue(item.immigration || "N/A"), // Immigration Status
    ];
    csvRows.push(row.join(","));
  });

  return csvRows.join("\n");
};


  // Function to handle CSV download
  const downloadCSV = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "users_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="admin-container">
      <Button
        className="sticky-back-button"
        onClick={() => navigate("/")}
        style={{ backgroundColor: "rgb(72, 39, 110)" }}
      >
        Back
      </Button>

      {/* Export to CSV Button */}
      <Button
        onClick={downloadCSV}
        className="sticky-back-button"
        style={{ marginLeft: "20px", backgroundColor: "rgb(72, 39, 110)" }}
      >
        Export to CSV
      </Button>

      {loading ? (
        <p className="text-center my-2">Loading...</p>
      ) : data.length > 0 ? (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ProfileFor</th>
                <th>Community</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Intention</th>
                <th>Height</th>
                <th>Job Title</th>
                <th>Personality</th>
                <th>Hobbies</th>
                <th>Drinks</th>
                <th>Smokes</th>
                <th>City</th>
                <th>State</th>
                <th>DobYear</th>
                <th>Religion</th>
                <th>Diet</th>
                <th>Marital Status</th>
                <th>Immigration Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.firstName + " " + item.lastName || "N/A"}</td>
                  <td>{item.profileFor || "N/A"}</td>
                  <td>{item.community || "N/A"}</td>
                  <td>{item.email || "N/A"}</td>
                  <td>{item.gender || "N/A"}</td>
                  <td>{item.intention || "N/A"}</td>
                  <td>{item.height || "N/A"}</td>
                  <td>{item.jobTitle || "N/A"}</td>
                  <td>
                    {Array.isArray(item.personality)
                      ? item.personality.join(", ")
                      : "N/A"}
                  </td>
                  <td>
                    {Array.isArray(item.hobbies)
                      ? item.hobbies.join(", ")
                      : "N/A"}
                  </td>
                  <td>{item.drinks || "N/A"}</td>
                  <td>{item.smokes || "N/A"}</td>
                  <td>{item.city || "N/A"}</td>
                  <td>{item.state || "N/A"}</td>
                  <td>{item.dobYear || "N/A"}</td>
                  <td>{item.religion || "N/A"}</td>
                  <td>{item.diet || "N/A"}</td>
                  <td>{item.previousMaritalStatus || "N/A"}</td>
                  <td>{item.immigration || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Empty Data</p>
      )}
    </div>
  );
};

export default Users;
