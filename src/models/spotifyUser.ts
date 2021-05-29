import { cloneDeep } from 'lodash';
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import { SpotifyUser } from '../types';
import { SpotifyApiAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------

export const ADD_SPOTIFY_USER = 'ADD_SPOTIFY_USER';


// ------------------------------------
// Actions
// ------------------------------------

export interface AddSpotifyUserPayload {
  spotifyUser: SpotifyUser;
}

export const addSpotifyUser = (
  spotifyUser: SpotifyUser
): SpotifyApiAction<AddSpotifyUserPayload> => {

  return {
    type: ADD_SPOTIFY_USER,
    payload: {
      spotifyUser,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

// TEDTODO - initialize
const initialState: SpotifyUser = null;

export const spotifyUserReducer = (
  state: SpotifyUser = initialState,
  action: SpotifyApiAction<AddSpotifyUserPayload>
): SpotifyUser => {
  switch (action.type) {
    case ADD_SPOTIFY_USER: {
      let newState = cloneDeep(state);
      const { spotifyUser } = action.payload;
      newState = spotifyUser;
      return newState;
    }
    default:
      return state;
  }
};

