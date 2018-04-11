import * as actionTypes from './constants';
/* eslint-disable */
import { apiCall } from '../../utils/index';

const features = [
  {
    "name": "redux",
    "title": "Redux",
    "description": "redux is good",
    "hasMore": true
  },
  {
    "name": "hmr",
    "title": "Hot module replacement",
    "description": "hot module replacemnt",
    "hasMore": true
  },
  {
    "name": "ssr",
    "title": "server side rendering",
    "description": "server side rendering",
    "hasMore": true
  }
];
/* eslint-enable */
export const fetchList = () => (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.FETCH_LIST_SUCCESS,
        features
      });

      resolve(features)
    }, 2000)
  });
};
