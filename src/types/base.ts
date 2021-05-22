import { SpotifyPlaylist } from './spotifyApi';

export interface SpotifyState {
  spotifyPlaylists: SpotifyPlaylistsMap;
}

export interface SpotifyPlaylistsMap {
  [id: string]: SpotifyPlaylist; // spotifyPlaylistId
}

