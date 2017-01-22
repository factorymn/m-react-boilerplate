import * as actionTypes from '../constants/TestConstants';
import { apiCall } from '../utils';

export function fetchAction() {
  console.log('fetch action run');

  return (dispatch) => {
    apiCall({
      method: 'GET',
      host: 'http://beta.json-generator.com',
      path: '/api/json/get/EyeaSD28M'
    }).then(response => {
      dispatch({
        type: actionTypes.FETCH_DATA,
        message: response.data.message
      });
    });
  };
}
