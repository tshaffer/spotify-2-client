import { SpotifyPlaylists, SpotifyState } from '../types';

export const getSpotifyPlaylists = (state: SpotifyState): SpotifyPlaylists => {
  return state.spotifyPlaylists;
};

