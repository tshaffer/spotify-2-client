import { SpotifyWebPlaybackState, SpotifyState } from '../types';

export const getSpotifyPlaybackState = (state: SpotifyState): SpotifyWebPlaybackState => {
  return state.spotifyPlaybackState;
};
