import { isNil, isArray } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { SpotifyPlaylist, SpotifyPlaylists } from '../types';
import { getSpotifyPlaylists } from '../selectors';

export interface PlaylistsProps {
  spotifyPlaylists: SpotifyPlaylists;
}

const Playlists = (props: PlaylistsProps) => {

  const handleOpenPlaylist = (spotifyPlaylist: SpotifyPlaylist): any => {
    console.log('handleOpenPlaylist');
    console.log(spotifyPlaylist);
  };

  const handleOpenPlaylistNew = (e: any): any => {
    console.log('invoke handleOpenPlaylistNew');
    const spotifyPlaylistId: string = e.target.getAttribute('data-item');
    console.log(spotifyPlaylistId);
  };

  //       <tr key={spotifyPlaylist.id} data-item={spotifyPlaylist.id} onClick={handleOpenPlaylistNew}>

  const buildPlaylistRow = (spotifyPlaylist: SpotifyPlaylist): any => {
    return (
      <tr key={spotifyPlaylist.id} data-item={spotifyPlaylist.id} onClick={() => handleOpenPlaylist(spotifyPlaylist)}>
        <td>
          {spotifyPlaylist.name}
        </td>
        <td>
          {spotifyPlaylist.tracks.total}
        </td>
        <td>
          <IconButton
            id={spotifyPlaylist.id}
            onClick={() => handleOpenPlaylist(spotifyPlaylist)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </td>
      </tr>
    );
  };

  const buildPlaylistRows = (): any[] => {

    const playlistRows: any = props.spotifyPlaylists.items.map((spotifyPlaylist: SpotifyPlaylist) => {
      const playlistRow = buildPlaylistRow(spotifyPlaylist);
      return playlistRow;
    });

    return playlistRows;
  };

  console.log('spotifyPlaylists');
  console.log(props.spotifyPlaylists);

  if (isArray(props.spotifyPlaylists.items) && props.spotifyPlaylists.items.length > 0) {

    // table of Playlists
    //    name
    //    tracks.total
    const playlistRows = buildPlaylistRows();
    return (
      <div id='SummaryActivities'>
        <br />
        <table id='activitiesTable'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Track Count</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {playlistRows}
          </tbody>
        </table>
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
