// https://developer.spotify.com/documentation/web-api/reference/#object-privateuserobject
export interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: any;
  external_urls: SpotifyExternalUrlObject[]; // ExternalUrlObject
  followers: SpotifyFollowersObject;
  href: string;
  id: string;
  images: SpotifyImageObject[]; // Array[ImageObject]
  product: string;
  type: string;
  uri: string;
}
// https://developer.spotify.com/documentation/web-api/reference/#object-pagingobject
export interface SpotifyPagingObject {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number; 
}

export interface SpotifyPlaylists extends SpotifyPagingObject {
  items: SpotifyPlaylist[];
}

export interface SpotifyPlaylistItems extends SpotifyPagingObject {
  items: SpotifyPlaylistTrackObject[];
}

// https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedplaylistobject
export interface SpotifyPlaylist {  // SimplifiedPlaylistObject
  collaborative: boolean;
  description: boolean | null;
  external_urls: SpotifyExternalUrlObject[]; // ExternalUrlObject
  href: string;
  id: string;
  images: SpotifyImageObject[]; // Array[ImageObject]
  name: string;
  owner: SpotifyPublicUserObject; // PublicUserObject
  primary_color?: any;  // undocumented
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyPlaylistTracksRefObject; // PlaylistTracksRefObject
  type: string;
  uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-externalurlobject
export interface SpotifyExternalUrlObject {
  spotify: string;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-imageobject
export interface SpotifyImageObject {
  height: number | null;
  url: string;
  width: number | null;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-publicuserobject
export interface SpotifyPublicUserObject {
  display_name: string;
  external_urls: SpotifyExternalUrlObject;
  followers: SpotifyFollowersObject;
  href: string;
  id: string;
  images: SpotifyImageObject[];
  type:	string
  uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-followersobject
export interface SpotifyFollowersObject {
  href: string;
  total: number;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-playlisttracksrefobject
export interface SpotifyPlaylistTracksRefObject {
  href: string;
  total: number;
}

export interface SpotifyPlaylistTrackObject {
  added_at: any; // Timestamp
  added_by: any; // PublicUserObject
  is_local: boolean;
  primary_color?: any;
  track: SpotifyTrackObject;
  video_thumbnail?: any;
}

export interface SpotifyTrackObject {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode?: boolean;
  explicit: boolean;
  external_ids: any;  // TEDTODO - ??
  external_urls: SpotifyExternalUrlObject;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  linked_from: any; // ??
  name: string;
  popularity: number;
  preview_url: string;
  restrictions: any; // TrackRestrictionObject
  track?: boolean;
  track_number: number;
  type: string;
  uri: string;
}

// https://developer.spotify.com/documentation/web-api/reference/#object-albumobject
export interface SpotifyAlbum {
  album_type: 'string';
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: SpotifyExternalUrlObject;
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface SpotifyArtist {
  external_urls: SpotifyExternalUrlObject[]; // TEDTODO - array?
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
