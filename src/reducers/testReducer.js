import * as actionTypes from '../constants/TestConstants';

const initialState = {
  message: ''
};

export default function testReducer(state = initialState, action) {
  const {
    message,
    type
  } = action;

  switch (type) {
    case actionTypes.FETCH_DATA:
      return {
        ...state,
        message
      };

    default:
      return state;
  }
}
