// src/pages/Premium.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE } from './constant';
import "./Premium.css"; // Import the CSS file
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_BASE}/getusers`);
        const premiumUsers = response.data.filter(user => user.Premium === "Q");
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

  const handleCheckboxChange = (email) => {
    setSelectedUsers(prevSelectedUsers =>
      prevSelectedUsers.includes(email)
        ? prevSelectedUsers.filter(userEmail => userEmail !== email)
        : [...prevSelectedUsers, email]
    );
  };

  const handleAccept = async () => {
    try {
      const response = await axios.patch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-xinyfjf/endpoint/acceptPremium', { emails: selectedUsers });
      console.log(response.data);
    } catch (error) {
      console.error("Error accepting premium users", error);
      alert("Error accepting premium users");
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.patch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-xinyfjf/endpoint/rejectPremium', { emails: selectedUsers });
      console.log(response.data);
    } catch (error) {
      console.error("Error rejecting premium users", error);
      alert("Error rejecting premium users");
    }
  };

  return (
    <div className="premium-container">
      <Button className="sticky-back-button" onClick={() => navigate('/')} style={{backgroundColor:"rgb(72, 39, 110)"}}>Back</Button>
      <Button className="sticky-accept-button" onClick={handleAccept} style={{backgroundColor:"rgb(72, 39, 110)", marginRight: "10px"}}>Accept</Button>
      <Button className="sticky-reject-button" onClick={handleReject} style={{backgroundColor:"rgb(72, 39, 110)"}}>Reject</Button>
      {loading ? (
        <p className="text-center my-2">Loading...</p>
      ) : data.length > 0 ? (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Select</th>
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
                  <td>
                    <Form.Check
                      type="checkbox"
                      onChange={() => handleCheckboxChange(item.email)}
                      checked={selectedUsers.includes(item.email)}
                    />
                  </td>
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

export default Premium;
