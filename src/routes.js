import { asyncComponent } from 'react-async-component';

import {
  TestActions,
} from './actions';

const AsyncInitialContainer = asyncComponent({
  resolve: () => System.import('./containers/InitialContainer/InitialContainer')
});

const AsyncAnotherContainer = asyncComponent({
  resolve: () => System.import('./containers/AnotherContainer/AnotherContainer')
});

export default [
  {
    path: '/',
    exact: true,
    initialFetchData: [
      ({ store }) => store.dispatch(TestActions.fetchAction()),
      ({ store }) => store.dispatch(TestActions.anotherFetchAction())
    ],
    component: AsyncInitialContainer,
  },
  {
    path: '/another/test',
    exact: true,
    component: AsyncAnotherContainer,
  }
];
