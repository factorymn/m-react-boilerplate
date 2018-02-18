import * as actionTypes from './constants';
import { apiCall } from '../../utils';

export const fetchList = () => (dispatch) => {
  return apiCall({
    path: '/data',
    method: 'GET'
  }).then(({ data }) => {
    if (data) {
      dispatch({
        type: actionTypes.FETCH_LIST_SUCCESS,
        features: data
      });
    }
  });
};
