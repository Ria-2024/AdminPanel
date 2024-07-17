// src/components/AnalyticsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BACKEND_BASE } from './constant';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await await axios.get(`${BACKEND_BASE}/getAnalytics`);
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Analytics Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table responsive="sm" striped bordered hover>
          <thead>
            <tr>
              <th>Screen ID</th>
              <th>Action</th>
              <th>Profile ID</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map((event, index) => (
              <tr key={index}>
                <td>{event.screenId}</td>
                <td>{event.action}</td>
                <td>{event.profileID}</td>
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
