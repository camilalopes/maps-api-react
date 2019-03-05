import { FS_CLIENT_ID, FS_CLIENT_SECRET } from "./credentials";

const URL = "https://api.foursquare.com/v2/venues/search?";
const VER = "20130619";
const LIM = 15;
const CATEGORIE = 'Food'

export const getFSVenues = (mapCenter) => {
  const requestURL = `${URL}ll=${ mapCenter.lat }, ${ mapCenter.lng }
    &client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=${VER}
    &query=${CATEGORIE}&limit=${LIM}`;

  return (fetch(requestURL)
    .then(data => {
      if (!data.ok) {
        throw data;
      } else return data.json();
    })
    .then(data => {
      return (data.response.venues);
    })
    //return goodPlaces;
  );
};
