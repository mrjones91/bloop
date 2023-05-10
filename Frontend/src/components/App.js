import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import SelectedBeast from './SelectedBeast.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      selectedBeast: {},
    }
  }

  displayAsModal = (beast) => {
    this.setState({ selectedBeast: beast, displayModal: true });
  }

  handleClose = () => {
    this.setState({ displayModal: false });
  }



  render() {
    return (
      <div className="App">
        <Header />
        <Main
          allBeasts={this.state.allBeasts}
          displayAsModal={this.displayAsModal}
          displayFilteredImages={this.updateAllBeasts}
        />
        <SelectedBeast
          selectedBeast={this.state.selectedBeast}
          show={this.state.displayModal}
          handleClose={this.handleClose}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
