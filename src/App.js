import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import List from './components/List'
import { getFSVenues } from "./utils/foursquareAPI";
import './App.css';

class App extends Component {

  state = {
    showingInfoWindow: false,
    center: {lat: -1.2884, lng: 36.8233},
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
   this.setState({activeMarkers: this.state.markers})
   this.getVenues(this.state.center);
 }

 getVenues(center) {
    //let setVenueState = this.setState.bind(this)
    getFSVenues(center)
      .then(venues => {
        this.setState({ venues: venues })
      });
  /*let setVenueState = this.setState.bind(this);
  const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';
  const params = {
    client_id: 'XC45SLP2PETGKNWV1UFQXSUJ0PNKIUVDQTX0IXOO3CFBGPSM',
    client_secret: '2TEPUANLKA4DIESECEK5T04GEDK31GID1IWJQ314O50VUOMU',
    limit: 15,
    query: 'Pubs',
    v: '20130619',
    ll: '51.5073,0.1276'
  };

  fetch(venuesEndpoint + new URLSearchParams(params), {
    method: 'GET'
  }).then(response => response.json()).then(response => {
    setVenueState({venues: response.response.groups[0].items});
  });*/
 }

  render() {
    var venueList = this.state.venues.map(item =>
      <li>{item.venue.name}</li>
      /*
      labeledLatLngs: [{…}]
      lat: 51.52357931312017
      lng: -0.01077586426038614

      formattedAddress

      id
      */
      //console.log(Object.values(item.venue))
    );
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
                icon={marker.icon}
                position={marker.position}
                name={marker.name} />
            })}

            <InfoWindow
              //soma a lat para a janela aparecer acima do marcador
              position={{lat: parseFloat(this.state.activeMarker.position.lat)+parseFloat(0.0029),
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

          <ul>
            {venueList}
          </ul>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASTD9r6pWJjIKgNUaQ46sWcMnkF2Nh-T4'
})(App);
