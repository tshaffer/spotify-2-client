import { cloneDeep } from 'lodash';
import { SpotifyPlaylistTrackObject } from '../types';
// import { SpotifyPlaylists } from '../types';
import { SpotifyPlaylistAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------

export const ADD_SPOTIFY_TRACKS = 'ADD_SPOTIFY_TRACKS';

// ------------------------------------
// Actions
// ------------------------------------

export interface AddSpotifyTracksPayload {
  spotifyTracks: SpotifyPlaylistTrackObject[];
}

export const addSpotifyTracks = (
  spotifyTracks: SpotifyPlaylistTrackObject[]
): SpotifyPlaylistAction<AddSpotifyTracksPayload> => {

  return {
    type: ADD_SPOTIFY_TRACKS,
    payload: {
      spotifyTracks,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

// TEDTODO - initialize
const initialState: SpotifyPlaylistTrackObject[] = [];

export const spotifyTracksReducer = (
  state: SpotifyPlaylistTrackObject[] = initialState,
  action: SpotifyPlaylistAction<AddSpotifyTracksPayload>
): SpotifyPlaylistTrackObject[] => {
  switch (action.type) {
    case ADD_SPOTIFY_TRACKS: {
      // return action.payload;
      // return { ...state, action.payload };
      const newState = cloneDeep(action.payload.spotifyTracks);
      return newState;
    }
    default:
      return state;
  }
};

