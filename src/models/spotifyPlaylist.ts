// ------------------------------------
// Constants

import { cloneDeep } from 'lodash';
import { SpotifyPlaylist, SpotifyPlaylistsMap } from '../types';
import { SpotifyPlaylistAction } from './baseAction';

// ------------------------------------
export const ADD_SPOTIFY_PLAYLIST = 'ADD_SPOTIFY_PLAYLIST';

// ------------------------------------
// Actions
// ------------------------------------

export type PartialPlaylistDescription = Partial<SpotifyPlaylist>;

export interface AddSpotifyPlaylistPayload {
  id: string;
  spotifyPlaylist: SpotifyPlaylist;
}

export const addSpotifyPlaylist = (
  id: string,
  spotifyPlaylist: SpotifyPlaylist
): SpotifyPlaylistAction<AddSpotifyPlaylistPayload> => {

  return {
    type: ADD_SPOTIFY_PLAYLIST,
    payload: {
      id,
      spotifyPlaylist,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: SpotifyPlaylistsMap = {};

export const spotifyPlaylistsReducer = (
  state: SpotifyPlaylistsMap = initialState,
  action: SpotifyPlaylistAction<AddSpotifyPlaylistPayload>
): SpotifyPlaylistsMap => {
  switch (action.type) {
    case ADD_SPOTIFY_PLAYLIST: {
      const newState = cloneDeep(state);
      const { id, spotifyPlaylist } = action.payload;
      newState[id] = spotifyPlaylist;
      return newState;
    }
    default:
      return state;
  }
};

