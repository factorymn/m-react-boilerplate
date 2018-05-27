import * as actionTypes from './constants';
/* eslint-disable */
import { apiCall } from '../../utils/index';

const features = [
  {
    "name": "redux",
    "title": "Redux",
    "description": "Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.",
    "hasMore": true
  },
  {
    "name": "hmr",
    "title": "Hot module replacement",
    "description": "Hot Module Replacement (HMR) improves the development experience by automatically updating modules in the browser at runtime without needing a whole page refresh. This means that application state can be retained as you change small things.",
    "hasMore": true
  },
  {
    "name": "ssr",
    "title": "Server Side Rendering",
    "description": "Server Side Rendering (SSR) is the process of taking a client-side JavaScript Framework website and rendering it to static HTML and CSS on the server. Why is this important? We all want fast loading websites and SSR is a tool to help you get your website rendered faster.",
    "hasMore": true
  }
]
/* eslint-enable */
export const fetchList = () => (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.FETCH_LIST_SUCCESS,
        features
      });

      resolve(features)
    }, 2500)
  });
};
