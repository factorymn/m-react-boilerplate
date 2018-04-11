import { asyncComponent } from 'react-async-component';

import * as HomePageActions from './containers/HomePage/actions';

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
      ({ store }) => store.dispatch(HomePageActions.fetchList())
    ],
    component: AsyncHomePage,
  },
  {
    path: '/about/test',
    exact: true,
    component: AsyncAboutPage,
  }
];
