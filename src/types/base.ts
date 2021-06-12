import {
  SpotifyPlaylists,
  SpotifyPlaylistTrackObject,
  SpotifyTrackQueue,
  SpotifyUser
} from './spotifyApi';

export interface SpotifyState {
  spotifyUser: SpotifyUser;
  spotifyPlaylists: SpotifyPlaylists;
  spotifyTracks: SpotifyPlaylistTrackObject[];
  spotifyTrackQueue: SpotifyTrackQueue;
}

