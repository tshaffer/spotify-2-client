import axios from 'axios';
import { addSpotifyPlaylists, addSpotifyTracks, addSpotifyUser } from '../models';
import { SpotifyPlaylist, SpotifyPlaylistItems, SpotifyPlaylists, SpotifyPlaylistTrackObject, SpotifyUser } from '../types';

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

export const shufflePlayback = () => {
  console.log('invoke shufflePlayback endpoint');
  const path = 'http://localhost:8888/api/v1/shufflePlayback';
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