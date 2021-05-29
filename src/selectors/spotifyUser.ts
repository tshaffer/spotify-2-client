import { SpotifyUser, SpotifyState } from '../types';

export const getSpotifyUser = (state: SpotifyState): SpotifyUser => {
  return state.spotifyUser;
};

