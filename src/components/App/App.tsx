import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { faHome, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  return (
    <Container>
      <FontAwesomeIcon icon={faUpload}/>
      <FontAwesomeIcon icon={faHome}/>
      Home
    </Container>
  );
}

export default App;
