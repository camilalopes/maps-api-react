import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import List from './components/List'
import { getFSVenues, getVenueInfo } from "./utils/foursquareAPI";
import { GOOGLE_MAP_KEY } from "./utils/credentials";
import ResponsiveMenu from 'react-responsive-navbar';

class App extends Component {

  state = {
    showingInfoWindow: false, //hides or show an Info Window
    center: {lat: 49.285, lng: -123.134}, //map center position
    markers: [], //all markers
    activeMarkers: [], //just the active markers (filtered)
    activeMarker: { //marker clicked
      id: '',
      address: '',
      position: {lat: {}, lng: {}},
      name: '',
      icon: ''
    },
    query: '',
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
     }).catch(err => {
       console.log(err);
     });

 }

 fitIntoMarkers(venues){
   let markers = []
   var marker

   venues.forEach(venue => {
     let position = {
       lat: venue.location.lat,
       lng: venue.location.lng
     };

     marker = {
       //photo: '',
       //rate: ,
       //tel: '',
       address: venue.location.address,
       position,
       name: venue.name,
       id: venue.id,
       icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
     }

    /* doesnt work well
    getVenueInfo(venue.id)
        .then(info => {
          //rate = info.rating ? info.rating :  ''
          //photo = info.bestPhoto? `${info.bestPhoto.prefix}width100${info.bestPhoto.suffix}` : ''
          //tel = info.contact.formattedPhone ? info.contact.formattedPhone : ''
        });*/

      markers.push(marker)
    })
   return markers
 }

  render() {

    return (
      <div className="container">
        <div className="map">
          {this.props.google ? (
            <Map
              google={this.props.google}
              zoom={14}
              initialCenter={this.state.center}
            >

              {this.state.activeMarkers.map((marker, index) => {
                return <Marker onClick={this.onMarkerClick}
                  id={marker.id}
                  address={marker.address}
                  key={index}
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
                <div className="info-content">
                  <h4>{this.state.activeMarker.name}</h4>
                  <p> {this.state.activeMarker.address} </p>
                  <a href="https://de.foursquare.com/" aria-label='Powered by foursquare'>
                    Powered by Foursquare <span id="logo-fs"></span>
                  </a>
                </div>
              </InfoWindow>
            </Map> ) : (<p>  Something went wrong, please check your conection </p>)
          }
        </div>

        <ResponsiveMenu
          menuOpenButton={<span id="menu-open"></span>}
          menuCloseButton={<span id="menu-close"></span>}
          changeMenuOn="600px"
          largeMenuClassName="side-bar"
          smallMenuClassName=""
          menu={

            <div className="side-bar">
              <h1> Vancouver Downtown </h1>
              <h2> find a good place to eat </h2>
              <input type="text" placeholder="Search a location name"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
                tabIndex="0"
                role="search"
              />

              <List markers={this.state.activeMarkers}
                onClick={(marker) => {
                  this.onMarkerClick(marker) }}
              />

            </div>
          }
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_KEY
})(App);
