import { cloneDeep } from 'lodash';
import { SpotifyPlaylists } from '../types';
import { SpotifyPlaylistAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------

export const ADD_SPOTIFY_PLAYLISTS = 'ADD_SPOTIFY_PLAYLISTS';


// ------------------------------------
// Actions
// ------------------------------------

export interface AddSpotifyPlaylistsPayload {
  spotifyPlaylists: SpotifyPlaylists;
}

export const addSpotifyPlaylists = (
  spotifyPlaylists: SpotifyPlaylists
): SpotifyPlaylistAction<AddSpotifyPlaylistsPayload> => {

  return {
    type: ADD_SPOTIFY_PLAYLISTS,
    payload: {
      spotifyPlaylists,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

// TEDTODO - initialize
const initialState: SpotifyPlaylists | any = {};

export const spotifyPlaylistsReducer = (
  state: SpotifyPlaylists = initialState,
  action: SpotifyPlaylistAction<AddSpotifyPlaylistsPayload>
): SpotifyPlaylists => {
  switch (action.type) {
    case ADD_SPOTIFY_PLAYLISTS: {
      let newState = cloneDeep(state);
      const { spotifyPlaylists } = action.payload;
      newState = spotifyPlaylists;
      return newState;
    }
    default:
      return state;
  }
};

