import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class HornedBeast extends React.Component {
  render() {
    return (
      <Card
        style={{ width: '18rem' }}
        bg="dark"
        text="light"
        onClick={() => this.props.addFavorite(this.props.beast)}
      >
        <Card.Img variant="top" src={this.props.beast.image_url} />
        <Card.Body>
          <Card.Title>{this.props.beast.title}</Card.Title>
          <Card.Text>
            ❤️ = {this.props.likes}
          </Card.Text>
          <Card.Text>
            {this.props.beast.description}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default HornedBeast;
