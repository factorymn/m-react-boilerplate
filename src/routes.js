// Import the containers used as pages
import InitialContainer from './containers/InitialContainer/InitialContainer';
import AnotherContainer from './containers/AnotherContainer/AnotherContainer';

export default [
  {
    path: '/',
    exact: true,
    component: InitialContainer,  // Add your route here
  },
  {
    path: '/another',
    component: AnotherContainer,
  }
];
