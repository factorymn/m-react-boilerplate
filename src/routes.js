// import { asyncComponent } from 'react-async-component';
//
// import * as HomePageActions from './containers/HomePage/actions';
//
// const AsyncHomePage = asyncComponent({
//   resolve: () => System.import('./containers/HomePage/HomePage')
// });
//
// const AsyncAboutPage = asyncComponent({
//   resolve: () => System.import('./containers/AboutPage/AboutPage')
// });
//
// export default [
//   {
//     path: '/',
//     exact: true,
//     initialFetchData: [
//       ({ store }) => store.dispatch(HomePageActions.fetchList())
//     ],
//     component: AsyncHomePage,
//   },
//   {
//     path: '/about/test',
//     exact: true,
//     component: AsyncAboutPage,
//   }
// ];
import React from 'react';
import { asyncConnect } from 'redux-connect'
import renderRoutes from 'react-router-config/renderRoutes'
// 1. Connect your data, similar to react-redux @connect
@asyncConnect([{
  key: 'lunch',
  promise: () => Promise.resolve({ id: 1, name: 'Borsch' })
}])
class App extends React.Component {
  render() {
    // 2. access data as props
    const { lunch, route } = this.props

    return (
      <div>
        {lunch.name}
        {renderRoutes(route.routes)}
      </div>
    )
  }
}

class Child extends React.Component {
  render() {
    return (
      <div>{'child component'}</div>
    )
  }
}

export default [{
  path: '/',
  component: App,
  routes: [{
    path: '/child',
    exact: true,
    component: Child,
  }]
}]