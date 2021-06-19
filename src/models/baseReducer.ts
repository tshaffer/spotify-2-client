/** @module Model:base */

import {
  combineReducers
} from 'redux';
import { SpotifyState } from '../types';
import { appStateReducer } from './appState';
import { spotifyPlaybackStateReducer } from './playbackState';

import { spotifyPlaylistsReducer } from './spotifyPlaylist';
import { spotifyTracksReducer } from './spotifyTrack';
import { spotifyUserReducer } from './spotifyUser';
import { spotifyTrackQueueReducer } from './trackQueue';

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const rootReducer = combineReducers<SpotifyState>({
  spotifyUser: spotifyUserReducer,
  spotifyPlaylists: spotifyPlaylistsReducer,
  spotifyTracks: spotifyTracksReducer,
  spotifyTrackQueue: spotifyTrackQueueReducer,
  spotifyPlaybackState: spotifyPlaybackStateReducer,
  appState: appStateReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

