import {
  SpotifyPlaylists,
  SpotifyPlaylistTrackObject,
  SpotifyTrackQueue,
  SpotifyUser,
  SpotifyWebPlaybackState
} from './spotifyApi';

export interface SpotifyState {
  spotifyUser: SpotifyUser;
  spotifyPlaybackState: SpotifyWebPlaybackState;
  spotifyPlaylists: SpotifyPlaylists;
  spotifyTracks: SpotifyPlaylistTrackObject[];
  spotifyTrackQueue: SpotifyTrackQueue;
}

