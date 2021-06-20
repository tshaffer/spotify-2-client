import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linkItem: {
      marginRight: '10px',
    },
  }),
);

export interface NavBarProps {
  user: string;
}

const NavBar = (props: NavBarProps) => {

  const classes = useStyles();

  return (
    <div>
      <ul>
        <Link className={classes.linkItem} to='/'>Home</Link>
        <Link className={classes.linkItem} to='/playlists'>Playlists</Link>
        <Link className={classes.linkItem} to='/queue'>Queue</Link>
      </ul>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    user: 'me',
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
