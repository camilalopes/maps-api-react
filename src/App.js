import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import List from './components/List'
import { getFSVenues } from "./utils/foursquareAPI";
import './App.css';

class App extends Component {

  state = {
    showingInfoWindow: false,
    center: {lat: 51.5073, lng: 0.1276},
    markers: [
      {
        position: {lat: -1.2884, lng: 36.8233},
        name: 'Restaurante',
        icon: {url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
      },
      {
        position: {lat: -1.28, lng: 36.8233},
        name: 'Padaria',
        icon: {url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
      },
      {
        position: {lat: -1.2884, lng: 36.81},
        name: 'Restô Cozy',
        icon: {url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
      }
    ],
    activeMarkers: [],
    activeMarker: {
      position: {lat: {}, lng: {}},
      name: '',
      icon: {url: ''}
    },
    query: '',
    venues: []
  };

  onMarkerClick = (marker) =>{
    //marker.icon.url = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    //console.log(marker.icon.url)
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
      });
    }
  };

  updateQuery = (query) => {
    this.setState({ query })
    this.searchMarker(query)
  };

  searchMarker = (query) => {
    this.setState({
      activeMarkers: this.state.markers.filter(marker =>
      marker.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    });
  };

 componentDidMount(){
   //get all the venues int the FS API and set the markers
   getFSVenues(this.state.center)
     .then(venues => {
       let markers = this.fitIntoMarkers(venues)
       this.setState({ markers: markers })
       this.setState({activeMarkers: markers})
     });
 }

 fitIntoMarkers(venues){
   let markers = []
   venues.forEach(venue => {
      const position = {
        lat: venue.location.lat,
        lng: venue.location.lng
      };
      let marker = {
        position,
        name: venue.name,
        id: venue.id,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      }
      markers.push(marker)
    })

   return markers
 }

  render() {

    return (
        <div className="map">
        <div className="container">
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={this.state.center}
          >

            {this.state.activeMarkers.map((marker) => {
              return <Marker onClick={this.onMarkerClick}
                icon={marker.icon}
                position={marker.position}
                name={marker.name} />
            })}

            <InfoWindow
              //sum a value to lat to the window appears above the marker
              position={{lat: parseFloat(this.state.activeMarker.position.lat)+parseFloat(0.008),
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
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
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
