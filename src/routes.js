import { asyncComponent } from 'react-async-component';

const AsyncHomePage = asyncComponent({
  resolve: () => System.import('./containers/HomePage/HomePage')
});

const AsyncAboutPage = asyncComponent({
  resolve: () => System.import('./containers/AboutPage/AboutPage')
});

export default [
  {
    path: '/',
    component: AsyncHomePage,
    routes: [{
      path: '/child',
      exact: true,
      component: AsyncAboutPage,
    }]
  }
];