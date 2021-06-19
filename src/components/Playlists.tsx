import { isNil, isArray } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';

import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { SpotifyPlaylist, SpotifyPlaylists } from '../types';
import { getSpotifyPlaylists } from '../selectors';
import { addPlaylistTracksToQueue, getMyPlaylists, openPlaylist, playPlaylist, playUri, } from '../controllers';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import NavBar from './NavBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navBarDiv: {
      verticalAlign: 'top',
      height: '32px',
    },
  }),
);


export interface PlaylistsProps {
  spotifyPlaylists: SpotifyPlaylists;
  onGetMyPlaylists: () => any;
  onOpenPlaylist: (spotifyPlaylist: SpotifyPlaylist) => any;
  onAddPlaylistTracksToQueue: (spotifyPlaylist: SpotifyPlaylist) => any;
  onPlayPlaylist: (spotifyPlaylist: SpotifyPlaylist) => any;
  onPlayUri: (spotifyPlaylist: SpotifyPlaylist) => any;
}

const Playlists = (props: PlaylistsProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  React.useEffect(props.onGetMyPlaylists, []);

  const handlePlayPlaylist = (spotifyPlaylist: SpotifyPlaylist): any => {
    console.log('handlePlayPlaylist');
    console.log(spotifyPlaylist);

    console.log('Play playlist with uri: ' + spotifyPlaylist.uri);
    props.onPlayUri(spotifyPlaylist);
    // props.onPlayPlaylist(spotifyPlaylist);
  };

  const handleOpenPlaylist = (spotifyPlaylist: SpotifyPlaylist): any => {
    console.log('handleOpenPlaylist');
    console.log(spotifyPlaylist);

    props.onOpenPlaylist(spotifyPlaylist);

    const hashHistory = createHashHistory();
    hashHistory.push('/tracks');
  };

  const handleAddPlaylistTracksToQueue = (spotifyPlaylist: SpotifyPlaylist): any => {
    console.log('handleAddPlaylistTracksToQueue');
    console.log(spotifyPlaylist);

    props.onAddPlaylistTracksToQueue(spotifyPlaylist);

    // const hashHistory = createHashHistory();
    // hashHistory.push('/tracks');
  };

  //       <tr key={spotifyPlaylist.id} data-item={spotifyPlaylist.id} onClick={() => handleOpenPlaylist(spotifyPlaylist)}>

  const buildPlaylistRow = (spotifyPlaylist: SpotifyPlaylist): any => {
    return (
      <tr key={spotifyPlaylist.id} data-item={spotifyPlaylist.id}>
        <td>
          <IconButton
            id={spotifyPlaylist.id}
            onClick={() => handlePlayPlaylist(spotifyPlaylist)}>
            <PlayArrowIcon />
          </IconButton>
        </td>
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
        <td>
          <IconButton
            id={spotifyPlaylist.id}
            onClick={() => handleAddPlaylistTracksToQueue(spotifyPlaylist)}>
            <QueueMusicIcon />
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

  // <div className={classes.navBarDiv}>
  // {NavBar}
  // </div>

  if (isArray(props.spotifyPlaylists.items) && props.spotifyPlaylists.items.length > 0) {

    // table of Playlists
    //    name
    //    tracks.total
    const playlistRows = buildPlaylistRows();
    return (
      <div>
        <br />
        <table id='activitiesTable'>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Track Count</th>
              <th />
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
    onGetMyPlaylists: getMyPlaylists,
    onAddPlaylistTracksToQueue: addPlaylistTracksToQueue,
    onOpenPlaylist: openPlaylist,
    onPlayPlaylist: playPlaylist,
    onPlayUri: playUri,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
