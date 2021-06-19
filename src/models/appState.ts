import { cloneDeep } from 'lodash';
import { AppState } from '../types';
import { SpotifyPlaylistAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------

export const SET_TARGET_PLAYBACK_PAUSED = 'SET_TARGET_PLAYBACK_PAUSED';

// ------------------------------------
// Actions
// ------------------------------------

export interface SetTargetPlaybackPausedPayload {
  targetPlaybackPaused: boolean;
}

export const setTargetPlaybackPaused = (
  targetPlaybackPaused: boolean
): SpotifyPlaylistAction<SetTargetPlaybackPausedPayload> => {

  return {
    type: SET_TARGET_PLAYBACK_PAUSED,
    payload: {
      targetPlaybackPaused,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: AppState = {
  targetPlaybackPaused: false
};

export const appStateReducer = (
  state: AppState = initialState,
  action: SpotifyPlaylistAction<SetTargetPlaybackPausedPayload>
): AppState => {
  switch (action.type) {
    case SET_TARGET_PLAYBACK_PAUSED: {
      const newState = cloneDeep(state);
      newState.targetPlaybackPaused = action.payload.targetPlaybackPaused;
      return newState;
    }
    default:
      return state;
  }
};

