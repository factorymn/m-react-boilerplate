import { asyncComponent } from 'react-async-component';

import {
  TestActions,
} from './actions';

const AsyncHomePage = asyncComponent({
  resolve: () => System.import('./containers/HomePage/HomePage')
});

const AsyncAboutPage = asyncComponent({
  resolve: () => System.import('./containers/AboutPage/AboutPage')
});

export default [
  {
    path: '/',
    exact: true,
    initialFetchData: [
      ({ store }) => store.dispatch(TestActions.fetchAction()),
      ({ store }) => store.dispatch(TestActions.anotherFetchAction())
    ],
    component: AsyncHomePage,
  },
  {
    path: '/about',
    exact: true,
    component: AsyncAboutPage,
  }
];
