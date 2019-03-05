import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import List from './components/List'
import { getFSVenues } from "./utils/foursquareAPI";
import { GOOGLE_MAP_KEY } from "./utils/credentials";
import './App.css';

class App extends Component {

  state = {
    showingInfoWindow: false, //hides or show an Info Window
    center: {lat: 49.285, lng: -123.134}, //map center position
    markers: [], //all markers
    activeMarkers: [], //just the active markers (filtered)
    activeMarker: { //marker clicked
      id: '',
      position: {lat: {}, lng: {}},
      name: '',
      icon: ''
    },
    query: ''
  };

  onMarkerClick = (marker) => {
    let selectedMarker = this.state.markers.find( m => m.id === marker.id)
    selectedMarker.icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    setTimeout(() => selectedMarker.icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', 100)
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = () => {
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
     console.log(Object.values(venue))
      const position = {
        lat: venue.location.lat,
        lng: venue.location.lng
      };
      let marker = {
        position,
        name: venue.name,
        id: venue.id,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        animation: null
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

            {this.state.activeMarkers.map((marker, index) => {
              return <Marker onClick={this.onMarkerClick}
                id={marker.id}
                key={index}
                animation={marker.animation}
                icon={marker.icon}
                position={marker.position}
                name={marker.name} />
            })}

            <InfoWindow
              //sum a value to lat to the window appears above the marker
              position={{lat: parseFloat(this.state.activeMarker.position.lat)+parseFloat(0.002),
                lng: parseFloat(this.state.activeMarker.position.lng)}}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.activeMarker.name}</h4>
                <p>  </p>
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
  apiKey: GOOGLE_MAP_KEY
})(App);
