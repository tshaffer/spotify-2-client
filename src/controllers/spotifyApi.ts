import axios from 'axios';
import { addSpotifyPlaylists, addSpotifyTracks, addSpotifyUser } from '../models';
import { SpotifyPlaylist, SpotifyPlaylistItems, SpotifyPlaylists, SpotifyPlaylistTrackObject, SpotifyUser } from '../types';

let player: any;
let token: string;
let deviceId: string;

(window as any).onSpotifyWebPlaybackSDKReady = () => {
  console.log('onSpotifyWebPlaybackSDKReady invoked');
  token = 'BQBFeDpMdwwMiOXizh_dgPd1lh88KR_lniWDBLfor0mkFnVrH1oZvG1GnV_0wYrw82eCBNorYRqhJY0HE1eI4FEV6qquqtg10VOOq9tN_RRTmQIJLEavvqYEX6j9oH3WC8P9e515qaz2dqg9DU_seB13dZ-XYu4U8A';
  player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  let message: string;

  // Error handling
  player.addListener('initialization_error', () => { console.error(message); });
  player.addListener('authentication_error', () => { console.error(message); });
  player.addListener('account_error', () => { console.error(message); });
  player.addListener('playback_error', () => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', (state: any) => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    deviceId = device_id;
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};

const loadSpotifyWebPlaybackSDK = () => {
  console.log('loadScript');
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.async = true;
  document.body.appendChild(script);
};

export const launchApp = () => {
  return ((dispatch: any, getState: any): any => {
    dispatch(getMe());
    loadSpotifyWebPlaybackSDK();
  });
};

export const getMe = () => {
  return ((dispatch: any, getState: any): any => {
    console.log('invoke getMe() endpoint');
    const path = 'http://localhost:8888/api/v1/getMe';
    axios.get(path)
      .then((response) => {
        console.log(response.data);
        dispatch(addSpotifyUser(response.data as SpotifyUser));
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

export const startPlayback = () => {
  console.log('invoke startPlayback endpoint');

  const spotify_uri = 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr';

  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify({ uris: [spotify_uri] }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  // const path = 'http://localhost:8888/api/v1/startPlayback';
  // axios.put(path)
  //   .then((response) => {
  //     console.log(response);
  //   }).catch((err: Error) => {
  //     console.log(err);
  //     return Promise.reject(err);
  //   });
};

export const pausePlayback = () => {
  console.log('invoke pausePlayback endpoint');
  const path = 'http://localhost:8888/api/v1/pausePlayback';
  axios.put(path)
    .then((response) => {
      console.log(response);
    }).catch((err: Error) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const shufflePlayback = (shuffleState: boolean) => {
  console.log('invoke shufflePlayback endpoint');
  const path = 'http://localhost:8888/api/v1/shufflePlayback/' + shuffleState.toString().toLowerCase();
  axios.post(path)
    .then((response) => {
      console.log(response);
    }).catch((err: Error) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const skipToNextTrack = () => {
  console.log('invoke skipToNextTrack endpoint');
  const path = 'http://localhost:8888/api/v1/skipToNextTrack';
  axios.post(path)
    .then((response) => {
      console.log(response);
    }).catch((err: Error) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const skipToPreviousTrack = () => {
  console.log('invoke skipToPreviousTrack endpoint');
  const path = 'http://localhost:8888/api/v1/skipToPreviousTrack';
  axios.post(path)
    .then((response) => {
      console.log(response);
    }).catch((err: Error) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const openPlaylist = (spotifyPlaylist: SpotifyPlaylist) => {
  return ((dispatch: any, getState: any): any => {
    console.log('invoke getPlaylistTracks endpoint');
    const path = 'http://localhost:8888/api/v1/getPlaylistTracks/' + spotifyPlaylist.id;
    axios.get(path)
      .then((response) => {
        console.log(response);
        // dispatch(addSpotifyPlaylists(spotifyPlaylists));
        const spotifyPlaylistItems: SpotifyPlaylistItems = response.data;
        const items: SpotifyPlaylistTrackObject[] = spotifyPlaylistItems.items;
        dispatch(addSpotifyTracks(items));
      }).catch((err: Error) => {
        console.log(err);
        return Promise.reject(err);
      });
  });
};

export const playPlaylist = (spotifyPlaylist: SpotifyPlaylist) => {
  return ((dispatch: any, getState: any): any => {
    console.log('invoke addPlaylistToQueue endpoint');
    console.log('context_uri');
    console.log(spotifyPlaylist.uri);
    const path = 'http://localhost:8888/api/v1/addPlaylistTracksToQueue/' + spotifyPlaylist.id + '/contextUri/' + spotifyPlaylist.uri;
    axios.get(path)
      .then((response) => {
        console.log(response.data);
      }).catch((err: Error) => {
        console.log(err);
        return Promise.reject(err);
      });
  });
};

export const playTrack = (spotifyPlaylistTrackObject: SpotifyPlaylistTrackObject) => {
  return ((dispatch: any, getState: any): any => {
    console.log('invoke playTrack endpoint');
    // const path = 'http://localhost:8888/api/v1/addPlaylistTracksToQueue/' + spotifyPlaylist.id;
    // axios.get(path)
    //   .then((response) => {
    //     console.log(response.data);
    //   }).catch((err: Error) => {
    //     console.log(err);
    //     return Promise.reject(err);
    //   });
  });
};