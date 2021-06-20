import { isNil, isArray } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';

import { HashRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { SpotifyPlaylistTrackObject } from '../types';
import { getSpotifyPlaylists, getTracks } from '../selectors';
import { addPlaylistTracksToQueue, getMyPlaylists, openPlaylist, playPlaylist, playUri, } from '../controllers';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import NavBar from './NavBar';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    navBarDiv: {
      verticalAlign: 'top',
      height: '32px',
    },
  }),
);


export interface QueueProps {
  tracksInQueue: SpotifyPlaylistTrackObject[];
}

const Queue = (props: QueueProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  // React.useEffect(props.onGetMyPlaylists, []);

  const buildRow = (track: SpotifyPlaylistTrackObject): any => {
    return (
      <tr key={track.track.id} data-item={track.track.id}>
        <td>
          {track.track.name}
        </td>
      </tr>
    );
  };

  const buildRows = (): any[] => {

    const queueRows: any = props.tracksInQueue.map((trackInQueue: SpotifyPlaylistTrackObject) => {
      const queueRow = buildRow(trackInQueue);
      return queueRow;
    });

    return queueRows;
  };


  const renderNavbar = () => {
    return (
      <NavBar />
    );
  };

  const renderContent = () => {

    if (isArray(props.tracksInQueue) && props.tracksInQueue.length > 0) {

      const queueRows = buildRows();

      return (
        <div>
          <br />
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {queueRows}
            </tbody>
          </table>
        </div>
      );

    } else {
      return null;
    }
  };

  const content = renderContent();
  const navBar = renderNavbar();

  if (isArray(props.tracksInQueue) && props.tracksInQueue.length > 0) {

    return (
      <HashRouter>
        <Container maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Ted Spotify
            </Typography>
            <div className={classes.navBarDiv}>
              {navBar}
            </div>
            {content}
          </div>
        </Container>
      </HashRouter>
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
    tracksInQueue: getTracks(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
