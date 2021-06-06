import axios from 'axios';
import { addSpotifyPlaylists, addSpotifyTracks, addSpotifyUser } from '../models';
import { SpotifyPlaylist, SpotifyPlaylistItems, SpotifyPlaylists, SpotifyPlaylistTrackObject, SpotifyUser } from '../types';

(window as any).onSpotifyWebPlaybackSDKReady = () => {
  console.log('onSpotifyWebPlaybackSDKReady invoked');
  const token = 'BQD8jvky7kKyyh9tggoul6Ml8OVc2XX5znWtoGKOpTlwujWugoj8XmrLxChm9hR-nQz5_x70ORajtAE5QJdf9vBI_QxSEmBeaHQ61fVc2LDBBV_rCe0qg4SoGdXvQncffkuWPuQWuX5EfqASGfs8P5e49SKYa54GYQ';
  const player = new Spotify.Player({
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
  const path = 'http://localhost:8888/api/v1/startPlayback';
  axios.put(path)
    .then((response) => {
      console.log(response);
    }).catch((err: Error) => {
      console.log(err);
      return Promise.reject(err);
    });
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