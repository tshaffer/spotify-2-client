import {
  SpotifyPlaylists,
  SpotifyPlaylistTrackObject,
  SpotifyUser
} from './spotifyApi';

export interface SpotifyState {
  spotifyUser: SpotifyUser;
  spotifyPlaylists: SpotifyPlaylists;
  spotifyTracks: SpotifyPlaylistTrackObject[];
}

