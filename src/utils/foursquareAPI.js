import { FS_CLIENT_ID, FS_CLIENT_SECRET } from "./credentials";

const URL = "https://api.foursquare.com/v2/venues/explore?";
const VER = "20130619";
const LIM = 15;
const CATEGORIE = 'Pubs'

export const getFSVenues = (mapCenter) => {
  const requestURL = `${URL}ll=${ mapCenter.lat }, ${ mapCenter.lng }
    &client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=${VER}
    &query=${CATEGORIE}&limit=${LIM}`;

  return (fetch(requestURL)
    .then(response => {
      if (!response.ok) {
        throw response;
      } else return response.json();
    })
    .then(data => {
      return (data.response.groups[0].items);
    })
    //return goodPlaces;
  );
};
