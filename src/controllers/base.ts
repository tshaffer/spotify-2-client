import axios from 'axios';
import { isNil } from 'lodash';

export const launchApp = () => {
  return ((dispatch: any, getState: any): any => {
    console.log('launch app');
    const path = 'http://localhost:8888/login';
    axios.get(path)
      .then((response) => {
        console.log(response);
      }).catch((err: Error) => {
        console.log(err);
        return Promise.reject(err);
      });
  });
};