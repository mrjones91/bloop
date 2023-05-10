import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return(
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Author: Code Fellows</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;