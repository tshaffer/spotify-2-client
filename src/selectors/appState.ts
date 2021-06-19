import { AppState, SpotifyState } from '../types';

export const getAppState = (state: SpotifyState): AppState => {
  return state.appState;
};

export const getTargetPlaybackPaused = (state: SpotifyState): boolean => {
  return state.appState.targetPlaybackPaused;
};
