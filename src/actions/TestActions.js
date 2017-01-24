import * as actionTypes from '../constants/TestConstants';
import { apiCall } from '../utils';

export function fetchAction() {
  return (dispatch) => apiCall({
    method: 'GET',
    host: 'http://beta.json-generator.com',
    path: '/api/json/get/EyeaSD28M'
  }).then(response => {
    dispatch({
      type: actionTypes.FETCH_DATA,
      message: response.data.message
    });
  });
}

export function anotherFetchAction() {
  return (dispatch) => apiCall({
    method: 'GET',
    host: 'http://beta.json-generator.com',
    path: '/api/json/get/4yz-BBePz'
  }).then(response => {
    dispatch({
      type: actionTypes.ANOTHER_FETCH_DATA,
      number: response.data.number
    });
  });
}
