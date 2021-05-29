/** @module Model:base */

import {
  combineReducers
} from 'redux';
import { SpotifyState } from '../types';

import { spotifyPlaylistsReducer } from './spotifyPlaylist';
import { spotifyUserReducer } from './spotifyUser';

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const rootReducer = combineReducers<SpotifyState>({
  spotifyUser: spotifyUserReducer,
  spotifyPlaylists: spotifyPlaylistsReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

