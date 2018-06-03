import * as actionTypes from './constants';

export const fetchMessage = () => (dispatch) => {
  return new Promise((resolve) => { // emulate AJAX request
    setTimeout(() => {
      dispatch({
        type: actionTypes.FETCH_MESSAGE_SUCCESS,
        message: 'Made in Manufactura in Voronezh in Russia.'
      });

      resolve()
    }, 2500);
  });
};
