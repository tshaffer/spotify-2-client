import { cloneDeep } from 'lodash';
import {
  SpotifyPlaylistTrackObject,
  SpotifyTrackQueue,
  SpotifyWebPlaybackState,
} from '../types';
import { SpotifyPlaylistAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------

export const SET_PLAYBACK_STATE = 'SET_PLAYBACK_STATE';

// ------------------------------------
// Actions
// ------------------------------------

export interface SetPlaybackStatePayload {
  playbackState: SpotifyWebPlaybackState;
}

export const setPlaybackState = (
  playbackState: SpotifyWebPlaybackState
): SpotifyPlaylistAction<SetPlaybackStatePayload> => {

  return {
    type: SET_PLAYBACK_STATE,
    payload: {
      playbackState,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: SpotifyWebPlaybackState = {
  context: null,
  disallows: null,
  duration: -1,
  paused: false,
  playback_quality: '',
  position: -1,
  repeat_mode: -1,
  restrictions: null,
  shuffle: false,
  timestamp: -1,
  track_window: null,
};

export const spotifyPlaybackStateReducer = (
  state: SpotifyWebPlaybackState = initialState,
  action: SpotifyPlaylistAction<SetPlaybackStatePayload>
): SpotifyWebPlaybackState => {
  switch (action.type) {
    case SET_PLAYBACK_STATE: {
      let newState = cloneDeep(state);
      const { playbackState } = action.payload;
      newState = playbackState;
      return newState;
    }
    default:
      return state;
  }
};

