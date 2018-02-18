import * as actionTypes from './constants';

const initialState = {
  features: []
};

export default function homePage(state = initialState, action) {
  const {
    features,
    type
  } = action;
  console.log('type ==>', type);
  switch (type) {
    case actionTypes.FETCH_LIST_SUCCESS:
      return {
        ...state,
        features
      };

    default:
      return state;
  }
}
