import axios from 'axios';
import { isNil } from 'lodash';

export const launchApp = () => {
  return ((dispatch: any, getState: any): any => {
    console.log('launch app');
    // const path = 'http://localhost:8888/login';
    const path = 'http://localhost:8888';
    axios.get(path)
      .then((response) => {
        console.log(response);
      }).catch((err: Error) => {
        console.log(err);
        return Promise.reject(err);
      });
  });
};

export const getMe = () => {
  return ((dispatch: any, getState: any): any => {
    console.log('invoke getMe() endpoint');
    const path = 'http://localhost:8888/api/v1/getMe';
    axios.get(path)
      .then((response) => {
        console.log(response.data);
      }).catch((err: Error) => {
        console.log(err);
        return Promise.reject(err);
      });
  });

};

export const getMyPlaylists = () => {
  return ((dispatch: any, getState: any): any => {
    console.log('invoke getMyPlaylists() endpoint');
    const path = 'http://localhost:8888/api/v1/getMyPlaylists';
    axios.get(path)
      .then((response) => {
        console.log(response.data);
      }).catch((err: Error) => {
        console.log(err);
        return Promise.reject(err);
      });
  });

};