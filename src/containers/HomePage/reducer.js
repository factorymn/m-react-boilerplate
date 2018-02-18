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
  message: ''
};

export default function homePage(state = initialState, action) {
  const {
    message,
    type
  } = action;

  switch (type) {
    case actionTypes.FETCH_LIST_SUCCESS:
      return {
        ...state,
        message
      };

    default:
      return state;
  }
}
