import {
  SpotifyPlaylistTrackObject,
  SpotifyTrackQueue,
} from '../types';
import { SpotifyPlaylistAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------

export const SET_QUEUE_INDEX = 'SET_QUEUE_INDEX';
export const SET_TRACK_QUEUE_CONTENTS = 'SET_TRACK_QUEUE_CONTENTS';

// ------------------------------------
// Actions
// ------------------------------------

export interface SetQueueIndexPayload {
  queueIndex: number;
}

export const setQueueIndex = (
  queueIndex: number
): SpotifyPlaylistAction<SetQueueIndexPayload> => {

  return {
    type: SET_QUEUE_INDEX,
    payload: {
      queueIndex,
    },
  };
};

export interface SetTrackQueueContentsPayload {
  spotifyTracks: SpotifyPlaylistTrackObject[];
}

export const setTrackQueueContents = (
  spotifyTracks: SpotifyPlaylistTrackObject[]
): SpotifyPlaylistAction<SetTrackQueueContentsPayload> => {

  return {
    type: SET_TRACK_QUEUE_CONTENTS,
    payload: {
      spotifyTracks,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: SpotifyTrackQueue= {
  queueIndex: -1,
  tracks: [],
};

export const spotifyTrackQueueReducer = (
  state: SpotifyTrackQueue = initialState,
  action: SpotifyPlaylistAction<SetQueueIndexPayload & SetTrackQueueContentsPayload>
): SpotifyTrackQueue => {
  switch (action.type) {
    case SET_QUEUE_INDEX: {
      return {
        ...state,
        queueIndex: action.payload.queueIndex,
      };
    }
    case SET_TRACK_QUEUE_CONTENTS: {
      return {
        ...state,
        tracks: action.payload.spotifyTracks,
      };
    }
    default:
      return state;
  }
};

