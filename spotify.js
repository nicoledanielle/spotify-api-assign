'use strict';

const CLIENT_ID = '8a96ae40fbd54426b41cd54c461171a7';

const getFromApi = function (endpoint, query = {}) {
  // You won't need to change anything in this function, but you will use this function 
  // to make calls to Spotify's different API endpoints. Pay close attention to this 
  // function's two parameters.

  const url = new URL(`https://api.spotify.com/v1/${endpoint}`);

  // console.log(url);

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${localStorage.getItem('SPOTIFY_ACCESS_TOKEN')}`);
  headers.set('Content-Type', 'application/json');
  const requestObject = {
    headers
  };

  // console.log('headers', headers);
  // console.log('requestObject', requestObject);

  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  return fetch(url, requestObject).then(function (response) {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    // console.log(response.json());
    return response.json();
  });
};

let artist;

const getArtist = function (name) {

  const query = {
    q: name,
    limit: 1,
    type: 'artist'
  };

  getFromApi('/search', query).then( item => {
    artist = item.artists.items[0];
    console.log('I made it here!');
    return {artist};
  }).then( res => {
    console.log('json version', res.json());
    return res.json();
  });
  // Edit me!
  // (Plan to call `getFromApi()` several times over the whole exercise from here!)
};





// =========================================================================================================
// IGNORE BELOW THIS LINE - THIS IS RELATED TO SPOTIFY AUTHENTICATION AND IS NOT NECESSARY  
// TO REVIEW FOR THIS EXERCISE
// =========================================================================================================
const login = function () {
  const AUTH_REQUEST_URL = 'https://accounts.spotify.com/authorize';
  const REDIRECT_URI = 'http://localhost:8080/auth.html';

  const query = new URLSearchParams();
  query.set('client_id', CLIENT_ID);
  query.set('response_type', 'token');
  query.set('redirect_uri', REDIRECT_URI);

  window.location = AUTH_REQUEST_URL + '?' + query.toString();
};

$(() => {
  $('#login').click(login);
});