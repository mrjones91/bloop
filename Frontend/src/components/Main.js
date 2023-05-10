import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import HornedBeast from './HornedBeast';
// import rawData from './data.json';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBeasts: [],
      filteredBeasts: [],
    }
  }

  // filter = (e) => {
  //   const numHorns = parseInt(e.target.value);
  //   let gallery = this.state.allBeasts;
  //   if (numHorns) {
  //     gallery = this.state.allBeasts.filter((creature) => creature.horns === numHorns);
  //   }
  //   this.setState({ filteredBeasts: gallery });
  // };
  setData = (val) => {
    this.setState({filteredBeasts: val});
  }

  getData = async (e) => {
    const API = `http://localhost:3001/beasts?horns=${e.target.value}`;
    try {
      let response = await axios.get(API).then((res) => {
        console.log(res);
        this.setData(res.data);
      });
    } catch (e) {
      console.error(e);
    }
    
  }

  postData = async () => {
    const API = `http://localhost:3001/beasts`
    let bodyObj = {
      "title": this.state.jared,
      "description": "Data POSTed from FrontEnd",
      "keyword": "100k",
      "horns": 3
      }
    let response = await axios.post(API, bodyObj)
  }

  addFavorite = (favoritedBeast) => {
    const updatedBeasts = this.state.allBeasts.map(beast => {
      if (beast._id === favoritedBeast._id) {
        beast.favorites++;
      }
      return beast;
    });
    this.setState({ allBeasts: updatedBeasts });
    this.props.displayAsModal(favoritedBeast);
  }

  render() {
    return (
      <div id="beast-container">
        <button onClick={this.postData}>Click</button>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>How Many Horns?</Form.Label>
            <Form.Control as="select" onChange={this.getData}>
              <option value="">All</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="100">Wow...</option>
            </Form.Control>
          </Form.Group>
        </Form>

        <Col>
          <Row>
          {this.state.filteredBeasts.map(beast => (
            <HornedBeast
              key={beast._id}
              beast={beast}
              displayAsModal={this.props.displayAsModal}
              likes={beast.favorites}
              addFavorite={this.addFavorite}
            />
          ))}
          </Row>
        </Col>
      </div>
    )
  }
}

export default Main;