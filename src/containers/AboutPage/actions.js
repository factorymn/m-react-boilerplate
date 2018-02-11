import * as actionTypes from './constants';

export const fetchAction = () => (dispatch) => new Promise((resolve) => {
  setTimeout(() => {
    dispatch({
      type: actionTypes.FETCH_DATA,
      message: 'ojoj'
    });

    resolve();
  }, 2000);
});

export const anotherFetchAction = () => (dispatch) => new Promise((resolve) => {
  setTimeout(() => {
    dispatch({
      type: actionTypes.ANOTHER_FETCH_DATA,
      number: 33
    });

    resolve();
  }, 3000);
});
