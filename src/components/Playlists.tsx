import { isNil, isArray } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SpotifyPlaylists } from '../types';
import { getSpotifyPlaylists } from '../selectors';

export interface PlaylistsProps {
  spotifyPlaylists: SpotifyPlaylists;
}

const Playlists = (props: PlaylistsProps) => {

  console.log('spotifyPlaylists');
  console.log(props.spotifyPlaylists);

  if (isArray(props.spotifyPlaylists.items) && props.spotifyPlaylists.items.length > 0) {
    return (
      <div>
        Number of items { props.spotifyPlaylists.items.length }
      </div>
    );
  }

  return (
    <div>
      Loading...
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    spotifyPlaylists: getSpotifyPlaylists(state)
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
