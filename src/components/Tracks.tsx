import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { SpotifyPlaylistTrackObject } from '../types';
import { getSpotifyTracks } from '../selectors';
import { isArray } from 'lodash';

import { getDuration } from '../utilities';

import { playTrack } from '../controllers';

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

export interface TracksProps {
  spotifyTracks: SpotifyPlaylistTrackObject[];
  onPlayTrack: (spotifyPlaylistTrackObject: SpotifyPlaylistTrackObject) => any;
}

const Tracks = (props: TracksProps) => {

  const classes = useStyles();

  // Equivalent to old componentDidMount
  // React.useEffect(props.onGetMe, []);

  const handlePlayTrack = (spotifyTrack: SpotifyPlaylistTrackObject): any => {
    console.log('handlePlayTrack');
    console.log(spotifyTrack);
    props.onPlayTrack(spotifyTrack);
  };


  const buildRow = (spotifyTrack: SpotifyPlaylistTrackObject): any => {
    return (
      <tr key={spotifyTrack.track.id}>
        <td>
          <IconButton
            id={spotifyTrack.track.id}
            onClick={() => handlePlayTrack(spotifyTrack)}>
            <PlayArrowIcon />
          </IconButton>
        </td>
        <td>
          {spotifyTrack.track.name}
        </td>
        <td>
          {spotifyTrack.track.album.name}
        </td>
        <td>
          {getDuration(spotifyTrack.track.duration_ms)}
        </td>
      </tr>
    );
  };


  const buildRows = (spotifyTracks: SpotifyPlaylistTrackObject[]): any[] => {
    const rows: any = spotifyTracks.map((spotifyTrack: SpotifyPlaylistTrackObject) => {
      const row = buildRow(spotifyTrack);
      return row;
    });

    return rows;
  };

  console.log('spotifyTracks');
  console.log(props.spotifyTracks);

  if (isArray(props.spotifyTracks) && props.spotifyTracks.length > 0) {

    const rows = buildRows(props.spotifyTracks);

    return (
      <div id=''>
        <br />
        <table id=''>
          <thead>
            <tr>
              <th />
              <th>Track</th>
              <th>Album</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {rows}
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

function mapStateToProps(state: any) {
  return {
    spotifyTracks: getSpotifyTracks(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onPlayTrack: playTrack,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
