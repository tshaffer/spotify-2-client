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

import IconButton from '@material-ui/core/IconButton';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import Playlists from './Playlists';

import {
  getMe,
  getMyPlaylists,
  authenticate,
  shufflePlayback,
  skipToPreviousTrack,
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
    parentDiv: {
      position: 'relative',
      // height: '1080px',
      height: '100%',
    },
    toolbarDiv: {
      position: 'absolute',
      left: '50%',
      bottom: '0px',
      transform: 'translateX(-50%)',
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
  onShufflePlayback: (shuffleState: boolean) => any;
  onSkipPrevious: () => any;
  onPausePlayback: () => any;
  onStartOrResumePlayback: () => any;
  onSkipNext: () => any;
}

const Home = (props: HomeProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  React.useEffect(props.onGetMe, []);

  const getShuffleIcon = () => {
    return (
      <IconButton
        id={'1'}
        onClick={handleShuffle}>
        <ShuffleIcon style={{ color: 'green' }} />
      </IconButton>
    );
  }
  
  const getPreviousIcon = () => {
    return (
      <IconButton
        id={'1'}
        onClick={handleSkipPrevious}>
        <SkipPreviousIcon style={{ color: 'green' }} />
      </IconButton>
    );
  }
  
  const getPauseIcon = () => {
    return (
      <IconButton
        id={'1'}
        onClick={handlePause}>
        <PauseIcon style={{ color: 'green' }} />
      </IconButton>
    );
  }
  
  const getPlayIcon = () => {
    return (
      <IconButton
        id={'1'}
        onClick={handlePlay}>
        <PlayArrowIcon style={{ color: 'green' }} />
      </IconButton>
    );
  }
  
  const getNextIcon = () => {
    return (
      <IconButton
        id={'1'}
        onClick={handleSkipNext}>
        <SkipNextIcon style={{ color: 'green' }} />
      </IconButton>
    );
  }
  
  const handleShuffle = () => {
    console.log('handleShuffle invoked');
    props.onShufflePlayback(true);
  }

  const handleSkipPrevious = () => {
    console.log('handleSkipPrevious invoked');
    props.onSkipPrevious();
  }
  
  const handlePause = () => {
    console.log('handlePause invoked');
    props.onPausePlayback();
  }
  
  const handlePlay = () => {
    console.log('handlePlay invoked');
    props.onStartOrResumePlayback();
  }
  
  const handleSkipNext = () => {
    console.log('handleSkipNext invoked');
    props.onSkipNext();
  }
  
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
        <a href="http://localhost:8888/login">
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

  const renderToolbar = () => {
    return (
      <div className={classes.toolbarDiv}>
        {getShuffleIcon()}
        {getPreviousIcon()}
        {getPauseIcon()}
        {getPlayIcon()}
        {getNextIcon()}
      </div>
    );
  };

  const mainPage = renderMainPage();
  const toolBar = renderToolbar();

  return (

    <HashRouter>
      <Container maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Ted Spotify
          </Typography>
          {mainPage}
          {toolBar}
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
    onShufflePlayback: shufflePlayback,
    onSkipPrevious: skipToPreviousTrack,
    onPausePlayback: pausePlayback,
    onStartOrResumePlayback: startPlayback,
    onSkipNext: skipToNextTrack,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
