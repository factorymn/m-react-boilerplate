import * as actionTypes from './constants';

export const fetchList = () => (dispatch) => new Promise((resolve) => {
  setTimeout(() => {
    dispatch({
      type: actionTypes.FETCH_LIST_SUCCESS,
      message: 'ojoj'
    });

    resolve();
  }, 2000);
});

