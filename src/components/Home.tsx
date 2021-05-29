import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';

// import { Link as RouterLink } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Playlists from './Playlists';

import {
  getMe,
  getMyPlaylists,
  authenticate,
  pausePlayback,
  skipToNextTrack,
  startPlayback,
} from '../controllers';
import { getSpotifyUser } from '../selectors';
import { isNil } from 'lodash';
import { SpotifyUser } from '../types';

/*
    // root: {
    //   width: '100%',
    // },
    // paper: {
    //   width: '100%',
    //   marginBottom: theme.spacing(2),
    // },
*/

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    table: {
      minWidth: 750,
    },
    tableColumnNarrowWidth: {
      width: '32px',
    },
    tableColumnMediumWidth: {
      width: '64px',
    },
    tableColumnWideWidth: {
      width: '192px',
    },
    tableButtonColumnWidth: {
      width: '48px',
    },
  }),
);

export interface HomeProps {
  spotifyUser: SpotifyUser;
  onGetMe: () => any;
  onGetMyPlaylists: () => any;
  onAuthenticate: () => any;
  // onLaunchApp: () => any;
}

const Home = (props: HomeProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  React.useEffect(props.onGetMe, []);

  const handleAuthenticate = () => {
    console.log('handleAuthenticate');
    props.onAuthenticate();
  };

  const handleGetMe = () => {
    console.log('handleGetMe');
    props.onGetMe();
  };

  const handleGetMyPlaylists = () => {
    console.log('handleGetMyPlaylists');
    props.onGetMyPlaylists();
  };

  const handlePausePlayback = () => {
    console.log('handlePausePlayback');
    pausePlayback();
  };

  const handleStartPlayback = () => {
    console.log('handleStartPlayback');
    startPlayback();
  };

  const handleSkipToNextTrack = () => {
    console.log('handleSkipToNextTrack');
    skipToNextTrack();
  };

  const renderNoUser = () => {
    return (
      <div>
        <p>User not logged in</p>
        <a target='_blank' href="http://localhost:8888/login" rel="noreferrer">
          Login
        </a>
      </div>
    );
  };

  const renderAuthenticatedUser = () => {
    return (
      <div>
        User: {props.spotifyUser.display_name}
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleGetMyPlaylists}
        >
          Retrieve Playlists
        </Button>
        <Playlists />
      </div>
    );
  };

  const renderMainPage = () => {
    const spotifyUser: SpotifyUser = props.spotifyUser;
    if (isNil(spotifyUser)) {
      return renderNoUser();
    } else {
      return renderAuthenticatedUser();
    }
  };

  const oldRender = () => {
    return (
      <div>

        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleAuthenticate}
        >
          Authenticate
        </Button>
        <a target='_blank' href="http://localhost:8888/login" rel="noreferrer">
          Login
        </a>
        <Link href="#" onClick={handleGetMe}>
          Get Me
        </Link>
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleGetMyPlaylists}
        >
          Get My Playlists
        </Button>
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleStartPlayback}
        >
          Start Playback
        </Button>
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handlePausePlayback}
        >
          Pause Playback
        </Button>
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSkipToNextTrack}
        >
          Skip to next track
        </Button>
        <Playlists />
      </div>
    );
  };

  const mainPage = renderMainPage();
    
  return (

    <HashRouter>
      <Container maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Ted Spotify
          </Typography>
          {mainPage}
        </div>

      </Container>
    </HashRouter>
  );
};

function mapStateToProps(state: any) {
  return {
    spotifyUser: getSpotifyUser(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onAuthenticate: authenticate,
    onGetMe: getMe,
    onGetMyPlaylists: getMyPlaylists,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
