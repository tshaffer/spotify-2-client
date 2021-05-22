/* eslint-disable @typescript-eslint/ban-types */
import { Action } from 'redux';

export interface SpotifyBaseAction extends Action {
  type: string;   // override Any - must be a string
  payload: {} | null;
}


export interface SpotifyModelBaseAction<T> extends Action {
  type: string;   // override Any - must be a string
  payload: T;
  error?: boolean;
  meta?: {};
}

export interface SpotifyPlaylistAction<T> extends SpotifyBaseAction {
  payload: T;
}

