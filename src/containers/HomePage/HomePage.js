if (global.IS_BROWSER) {
  require('./HomePage.styl');
}

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HomePageActions from './actions';

import Logo from '-!babel-loader!svg-react-loader!./svg-logo.svg';

@connect(state => ({
  homePage: state.homePageReducer
}), dispatch => ({
  dispatch,
  actions: bindActionCreators(HomePageActions, dispatch)
}))
export default class HomePage extends Component {
  static propTypes = {
    actions: PropTypes.object,
    homePage: PropTypes.object
  };

  render() {
    return (
      <div className="c-home-page-root">
        <Helmet>
          <title>Manufactura react boilerplate</title>
          <meta property="og:title" content="Manufactura boilerplate" />
          <meta property="og:image" content="http://factory.mn/freeze/uUVpNVS2rspdiyDx-6nOkyIct4A.jpg" />
          <meta property="og:description" content="Boilerplate with server side rendering" />
        </Helmet>
        <Logo width="30" />
        <Link to="/about/test">
          go to another page!
          {this.props.homePage.message}
        </Link>
      </div>
    );
  }
}
