import { SpotifyTrackQueue, SpotifyState, SpotifyPlaylistTrackObject } from '../types';

export const getSpotifyTrackQueue = (state: SpotifyState): SpotifyTrackQueue => {
  return state.spotifyTrackQueue;
};

export const getQueueIndex = (state: SpotifyState): number => {
  return getSpotifyTrackQueue(state).queueIndex;
};

export const getTracks = (state: SpotifyState): SpotifyPlaylistTrackObject[] => {
  return getSpotifyTrackQueue(state).tracks;
};


