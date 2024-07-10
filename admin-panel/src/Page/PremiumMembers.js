// src/pages/Premium.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE } from './constant';
import "./Premium.css"; // Import the CSS file
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PremiumMembers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_BASE}/getusers`);
        const premiumUsers = response.data.filter(user => user.Premium === "A");
        setData(premiumUsers);
      } catch (error) {
        console.error("Error fetching data", error);
        alert("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 

  return (
    <div className="premium-container">
      <Button className="sticky-back-button" onClick={() => navigate('/')} style={{backgroundColor:"rgb(72, 39, 110)"}}>Back</Button>
      {loading ? (
        <p className="text-center my-2">Loading...</p>
      ) : data.length > 0 ? (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Image URLs</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.email || "N/A"}</td>
                  <td>{item.firstName || "N/A"}</td>
                  <td>{item.lastName || "N/A"}</td>
                  <td>{item.gender || "N/A"}</td>
                  <td>{item.age || "N/A"}</td>
                  <td>
                    {item.imageUrls && item.imageUrls.length > 0 ? (
                      <ul className="image-list">
                        {item.imageUrls.map((url, index) => (
                          <li key={index}>
                            <img src={url} alt={`Image ${index + 1}`} className="user-image" />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "N/A"
                    )}
                  </td>
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

export default PremiumMembers;
