// src/components/AnalyticsPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { BACKEND_BASE } from "./constant";
import { useNavigate } from "react-router-dom";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "asc",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE}/getAnalytics`);
        setAnalyticsData(response.data.reverse());
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const sortedData = () => {
    let sortableData = [...analyticsData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === "asc" ? "asc" : "desc";
    }
    return;
  };

  return (
    <Container>
      <h1 className="my-4">Analytics Data</h1>
      <Button
        className="sticky-back-button my-2"
        onClick={() => navigate("/")}
        style={{ backgroundColor: "rgb(72, 39, 110)" }}
      >
        Back
      </Button>
      <Button
        className="sticky-back-button my-2 mx-2"
        onClick={() => setAnalyticsData(sortedData())}
        style={{ backgroundColor: "rgb(72, 39, 110)" }}
      >
        Sort
      </Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table responsive="sm" striped bordered hover>
          <thead>
            <tr>
              <th
                onClick={() => requestSort("profileID")}
                className={getClassNamesFor("profileID")}
              >
                PID
              </th>
              <th
                onClick={() => requestSort("screenId")}
                className={getClassNamesFor("screenId")}
              >
                Screen
              </th>
              <th
                onClick={() => requestSort("component")}
                className={getClassNamesFor("component")}
              >
                Component
              </th>
              <th
                onClick={() => requestSort("action")}
                className={getClassNamesFor("action")}
              >
                Action
              </th>
              <th
                onClick={() => requestSort("timestamp")}
                className={getClassNamesFor("timestamp")}
              >
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map((event, index) => (
              <tr key={index}>
                <td>{event.profileID}</td>
                <td>{event.screenId}</td>
                <td>{event.component}</td>
                <td>{event.action}</td>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AnalyticsPage;
