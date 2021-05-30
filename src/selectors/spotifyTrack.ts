import { SpotifyState, SpotifyPlaylistTrackObject } from '../types';

export const getSpotifyTracks = (state: SpotifyState): SpotifyPlaylistTrackObject[] => {
  return state.spotifyTracks;
};

