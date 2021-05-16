/** @module Model:base */

import {
  combineReducers
} from 'redux';
import { SpotifyState } from '../types';

import { userReducer } from './user';

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const rootReducer = combineReducers<SpotifyState>({
  user: userReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

