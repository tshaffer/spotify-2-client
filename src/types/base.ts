import { SpotifyPlaylists, SpotifyUser } from './spotifyApi';

export interface SpotifyState {
  spotifyUser: SpotifyUser;
  spotifyPlaylists: SpotifyPlaylists;
}

