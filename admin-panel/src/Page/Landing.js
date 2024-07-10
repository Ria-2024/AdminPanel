// src/pages/LandingPage.js
import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col className="d-flex justify-content-around mx-2">
          <Button variant="primary" onClick={() => navigate('/analytics')} className="mx-2" style={{backgroundColor:"rgb(72, 39, 110)"}}>
            Analytics
          </Button>
          <Button variant="primary" onClick={() => navigate('/users')} className="mx-2" style={{backgroundColor:"rgb(72, 39, 110)"}}>
            Users
          </Button>
          <Button variant="primary" onClick={() => navigate('/premium')} className="mx-2" style={{backgroundColor:"rgb(72, 39, 110)"}}>
            Applications
          </Button>
          <Button variant="primary" onClick={() => navigate('/premiumMembers')} className="mx-2" style={{backgroundColor:"rgb(72, 39, 110)"}}>
            Premium Members
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;