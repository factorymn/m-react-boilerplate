import * as actionTypes from './constants';

const initialState = {
  message: '',
  number: null,
  foo: 'foo'
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
