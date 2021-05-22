import axios from 'axios';
import { addSpotifyPlaylists } from '../models';
import { SpotifyPlaylist, SpotifyPlaylists } from '../types';

export const getMe = () => {
  return ((dispatch: any, getState: any): any => {
    console.log('invoke getMe() endpoint');
    const path = 'http://localhost:8888/api/v1/getMe';
    axios.get(path)
      .then((response) => {
        console.log(response.data);
      }).catch((err: Error) => {
        console.log(err);
        return Promise.reject(err);
      });
  });

};

export const getMyPlaylists = () => {
  return ((dispatch: any, getState: any): any => {
    console.log('invoke getMyPlaylists() endpoint');
    const path = 'http://localhost:8888/api/v1/getMyPlaylists';
    axios.get(path)
      .then((response) => {
        console.log(response.data);
        const spotifyPlaylists: SpotifyPlaylists = response.data as SpotifyPlaylists;
        console.log('spotifyPlaylists');
        console.log(spotifyPlaylists);
        dispatch(addSpotifyPlaylists(spotifyPlaylists));
      }).catch((err: Error) => {
        console.log(err);
        return Promise.reject(err);
      });
  });

};