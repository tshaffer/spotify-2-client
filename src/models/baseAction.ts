import { Action } from 'redux';

// export interface SpotifyBaseAction extends Action {
//   type: string;
//   payload: {} | null;
// }

export interface SpotifyBaseAction<T> extends Action {
  type: string;   // override Any - must be a string
  payload: T;
  error?: boolean;
  meta?: {};
}

// export interface TagAction<T> extends SpotifyBaseAction {
//   payload: T;
// }
