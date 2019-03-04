import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import List from './components/List'
import './App.css';

class App extends Component {

  state = {
    showingInfoWindow: false,  //Hides or shows the infoWindow
    activeMarkers: [
      {
        position: {lat: -1.2884, lng: 36.8233},
        name: 'Restaurante'
      },
      {
        position: {lat: -1.28, lng: 36.8233},
        name: 'Padaria'
      },
      {
        position: {lat: -1.2884, lng: 36.81},
        name: 'Restô Cozy'
      }
    ],
    activeMarker: {
      position: {lat: {}, lng: {}},
      name: ''
    }
  };

  onMarkerClick = (marker) =>
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="map">
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{
             lat: -1.2884,
             lng: 36.8233
            }}
          >

            {this.state.activeMarkers.map((marker) => {
              return <Marker onClick={this.onMarkerClick}
                position={marker.position}
                name={marker.name} />
            })}

            <InfoWindow
              //soma a lat para a janela aparecer acima do marcador
              position={{lat: parseFloat(this.state.activeMarker.position.lat)+parseFloat(0.0035),
                lng: parseFloat(this.state.activeMarker.position.lng)}}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.activeMarker.name}</h4>
              </div>
            </InfoWindow>
          </Map>
        </div>
        <div className="side-bar">
          <h1> West End </h1>
          <input type="text" placeholder="Search a location name"
            //value={this.state.query}
            //onChange={(event) => this.updateQuery(event.target.value)}
          />

          <List markers={this.state.activeMarkers}
            onClick={(marker) => {
              this.onMarkerClick(marker) }}
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASTD9r6pWJjIKgNUaQ46sWcMnkF2Nh-T4'
})(App);
