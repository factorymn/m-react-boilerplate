import * as actionTypes from '../constants/TestConstants';

const initialState = {
  message: '',
  number: null,
};

export default function testReducer(state = initialState, action) {
  const {
    message,
    number,
    type
  } = action;

  switch (type) {
    case actionTypes.FETCH_DATA:
      return {
        ...state,
        message
      };
      
    case actionTypes.ANOTHER_FETCH_DATA:
      return {
        ...state,
        number
      };
    default:
      return state;
  }
}
