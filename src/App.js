import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './App.css';

class App extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarkers: [
      {
        position: {lat: -1.2884, lng: 36.8233},
        name: 'Restaurante'
      },
      {
        position: {lat: -1.28, lng: 36.8233},
        name: 'Padaria'
      }
    ],
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
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
              position={marker.position} name={marker.name} />
          })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASTD9r6pWJjIKgNUaQ46sWcMnkF2Nh-T4'
})(App);
