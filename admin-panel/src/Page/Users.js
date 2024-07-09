// src/pages/UsersPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE } from '../constant';
import { Link } from "react-router-dom";
import { Button, Table, Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <Container className="admin-container mt-4">
      <Row>
        <Col>
          <Link to="/" className="text-decoration-none">
            <Button variant="secondary" className="mb-3">Back to Landing Page</Button>
          </Link>
        </Col>
      </Row>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Intention</th>
              <th>Height</th>
              <th>Job Title</th>
              <th>Personality</th>
              <th>Hobbies</th>
              <th>Drinks</th>
              <th>Image URLs</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.email || "N/A"}</td>
                <td>{((item.firstName||"N/A") + " "+(item.lastName||"N/A"))}</td>
                <td>{item.gender || "N/A"}</td>
                <td>{item.age || "N/A"}</td>
                <td>{item.intention || "N/A"}</td>
                <td>{item.height || "N/A"}</td>
                <td>{item.jobTitle || "N/A"}</td>
                <td>{Array.isArray(item.personality) ? item.personality.join(", ") : "N/A"}</td>
                <td>{Array.isArray(item.hobbies) ? item.hobbies.join(", ") : "N/A"}</td>
                <td>{item.drinks || "N/A"}</td>
                <td>
                  {item.imageUrls && item.imageUrls.length > 0 ? (
                    <ul className="list-unstyled">
                      {item.imageUrls.map((url, index) => (
                        <li key={index} className="mb-2">
                          <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            className="img-thumbnail"
                          />
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
        </Table>
      ) : (
        <p>No data available</p>
      )}
    </Container>
  );
};

export default UsersPage;
