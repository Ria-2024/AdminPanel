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

  return (
    <div className="admin-container">
      <Button
        className="sticky-back-button"
        onClick={() => navigate("/")}
        style={{ backgroundColor: "rgb(72, 39, 110)" }}
      >
        Back
      </Button>
      {loading ? (
        <p className="text-center my-2">Loading...</p>
      ) : data.length > 0 ? (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
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
                <th>diet</th>
                <th>Marital Status</th>
                <th>Immigration Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.firstName || "N/A"}</td>
                  <td>{item.lastName || "N/A"}</td>
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
