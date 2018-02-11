import * as actionTypes from './constants';

const initialState = {
  features: [
    {
      name: 'redux',
      title: 'Redux',
      description: 'redux is good',
      hasMore: true
    },
    {
      name: 'hmr',
      title: 'Hot module replacement',
      description: 'hot module replacemnt',
      hasMore: true
    }
  ],
};

export default function homePage(state = initialState, action) {
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
