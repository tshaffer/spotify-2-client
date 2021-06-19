import {
  SpotifyPlaylists,
  SpotifyPlaylistTrackObject,
  SpotifyTrackQueue,
  SpotifyUser,
  SpotifyWebPlaybackState
} from './spotifyApi';

export interface SpotifyState {
  spotifyUser: SpotifyUser;
  appState: AppState;
  spotifyPlaybackState: SpotifyWebPlaybackState;
  spotifyPlaylists: SpotifyPlaylists;
  spotifyTracks: SpotifyPlaylistTrackObject[];
  spotifyTrackQueue: SpotifyTrackQueue;
}

export interface AppState {
  targetPlaybackPaused: boolean;
}