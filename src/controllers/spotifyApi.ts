import axios from 'axios';
import { addSpotifyPlaylists, addSpotifyTracks, addSpotifyUser, setPlaybackState, setQueueIndex, setTrackQueueContents } from '../models';
import { SpotifyPlaylist, SpotifyPlaylistItems, SpotifyPlaylists, SpotifyPlaylistTrackObject, SpotifyTrackObject, SpotifyUser } from '../types';

// TEDTODO
import { store } from '../index';

let player: any;
let token: string;
let deviceId: string;

(window as any).onSpotifyWebPlaybackSDKReady = () => {
  console.log('onSpotifyWebPlaybackSDKReady invoked');
  token = 'BQAv659G18nnd9T3ae-0fP7c73ATyQdPx-AbbKCsGc_Nfg5y-EMPgpQwVvgrANOIhdlgZ9rDnN2QOXNxpV0OkoWQbSt7CWZDGP8ZqXYx2ehwLY2KjJ93-RoRuqJf61YQYwsnqhmlwpwUfTlRv14M4m92gBU9nMmy7A';
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
  player.addListener('player_state_changed', playerStateChanged);

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

// play playlist
export const playUri = (spotifyPlaylist: SpotifyPlaylist) => {

  console.log('invoke playUri endpoint');
  return ((dispatch: any, getState: any): any => {

    // get playlist tracks
    const path = 'http://localhost:8888/api/v1/getPlaylistTracks/' + spotifyPlaylist.id;
    axios.get(path)
      .then((response) => {
        console.log(response);
        const spotifyPlaylistItems: SpotifyPlaylistItems = response.data;
        const items: SpotifyPlaylistTrackObject[] = spotifyPlaylistItems.items;
        const item: SpotifyPlaylistTrackObject = items[0];
        const spotifyTrackObject: SpotifyTrackObject = item.track;
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotifyTrackObject.uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        dispatch(setQueueIndex(0));
        dispatch(setTrackQueueContents(items));
      });
  });
};

export const startPlayback = () => {
  console.log('invoke startPlayback endpoint');

  return ((dispatch: any, getState: any): any => {

    const spotify_uri = 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr';

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  });
};

export const pausePlayback = () => {
  console.log('invoke pausePlayback endpoint');
  return ((dispatch: any, getState: any): any => {
    player.togglePlay().then(() => {
      console.log('Toggled playback!');
    });
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
  return ((dispatch: any, getState: any): any => {
    player.nextTrack().then(() => {
      console.log('Skipped to next track!');
    });
  });
};

export const skipToPreviousTrack = () => {
  console.log('invoke skipToPreviousTrack endpoint');
  return ((dispatch: any, getState: any): any => {
    player.previousTrack().then(() => {
      console.log('Set to previous track!');
    });
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

const playerStateChanged = (state: any) => {
  console.log('playerStateChanged');
  console.log(state);
  store.dispatch(setPlaybackState(state));
};
