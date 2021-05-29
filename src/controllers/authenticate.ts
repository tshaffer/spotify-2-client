import axios from 'axios';

// unused?
export const authenticate = () => {
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

