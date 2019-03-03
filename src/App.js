import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="map" role="map">
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
           lat: -1.2884,
           lng: 36.8233
          }}
        />
      </div>
    );
  }
}

//export default App;
export default GoogleApiWrapper({
  apiKey: 'AIzaSyASTD9r6pWJjIKgNUaQ46sWcMnkF2Nh-T4'
})(App);
