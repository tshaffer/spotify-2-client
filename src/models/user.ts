// ------------------------------------
// Constants

import { SpotifyBaseAction } from './baseAction';
import { User } from '../types';

// ------------------------------------
export const SET_USER = 'SET_USER';

// ------------------------------------
// Actions
// ------------------------------------
export interface SetUserPayload {
  user: User;
}

export const setUser = (
  user: User,
): SpotifyBaseAction<SetUserPayload> => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: User = {
  userName: '',
  email: '',
};

export const userReducer = (
  state: User = initialState,
  action: SpotifyBaseAction<SetUserPayload>
): User => {
  switch (action.type) {
    case SET_USER: {
      return action.payload.user;
    }
    default:
      return state;
  }
};

