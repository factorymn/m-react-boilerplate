import { asyncComponent } from 'react-async-component';

import * as AboutPageActions from './containers/AboutPage/actions';

const AsyncHomePage = asyncComponent({
  resolve: () => import('./containers/HomePage/HomePage')
});

const AsyncAboutPage = asyncComponent({
  resolve: () => import('./containers/AboutPage/AboutPage')
});

export default [
  {
    path: '/',
    exact: true,
    component: AsyncHomePage,
  },
  {
    path: '/about',
    exact: true,
    component: AsyncAboutPage,
    initialFetchData: [
      ({ store }) => store.dispatch(AboutPageActions.fetchMessage())
    ],
  }
];
