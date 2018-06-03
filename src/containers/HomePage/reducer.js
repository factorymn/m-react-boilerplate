// import * as actionTypes from './constants';

const initialState = {};

export default function homePage(state = initialState, action) {
  const {
    type
  } = action;

  switch (type) {
    // case actionTypes.ACTION_NAME:
    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
}
