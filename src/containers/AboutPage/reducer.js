import * as actionTypes from './constants';

const initialState = {
  message: null
};

export default function aboutPage(state = initialState, action) {
  const {
    type,
    message
  } = action;

  switch (type) {
    case actionTypes.FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        message
      };

    default:
      return state;
  }
}