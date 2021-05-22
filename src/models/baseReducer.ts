/** @module Model:base */

import {
  combineReducers
} from 'redux';
import { SpotifyState } from '../types';

import { spotifyPlaylistsReducer } from './spotifyPlaylist';

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const rootReducer = combineReducers<SpotifyState>({
  spotifyPlaylists: spotifyPlaylistsReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

