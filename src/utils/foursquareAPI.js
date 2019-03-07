import { FS_CLIENT_ID, FS_CLIENT_SECRET } from "./credentials";

const URL = "https://api.foursquare.com/v2/venues/";
const VER = "20130619";
const LIM = 15;
const CATEGORIE = 'Food'

export const getFSVenues = (mapCenter) => {
  const requestURL = `${URL}search?ll=${ mapCenter.lat }, ${ mapCenter.lng }
    &client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=${VER}
    &query=${CATEGORIE}&limit=${LIM}`;

  return (fetch(requestURL)
    .then(data => {
      if (!data.ok) {
        throw data;
      } else return data.json();
    }).catch(err => {
      console.log('There has been a problem with your fetch operation: ' + err);
    })
    .then(data => {
      return (data.response.venues);
    }).catch(err => {
      console.log('There has been a problem with your fetch operation: ' + err);
    })
  );
};

export const getVenueInfo = (venueId) => {
  const VENUE_ID = venueId;
  const requestURL = `${URL}${VENUE_ID}?client_id=${FS_CLIENT_ID}
    &client_secret=${FS_CLIENT_SECRET}&v=${VER}`

  return (fetch(requestURL)
    .then(data => {
      if(!data.ok){
        throw data;
      } else return data.json();
    }).catch(err => {
      console.log('There has been a problem with your fetch operation: ' + err);
    })
    .then(data =>{
      return (data.response.venue);
    }).catch(err => {
      console.log('There has been a problem with your fetch operation: ' + err);
    })
  );
}
