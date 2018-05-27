if (global.IS_BROWSER) {
  require('./HomePage.styl');
}

// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HomePageActions from './actions';

import PrettyPreloader from '../../components/PrettyPreloader/index';

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

  componentDidMount() {
    if (!this.props.homePage.features.length) {
      this.props.actions.fetchList();
    }
  }

  render() {
    const { features } = this.props.homePage;

    return (
      <div className="c-home-page-root">
        <Helmet>
          <title>Manufactura react boilerplate</title>
          <meta property="og:title" content="Manufactura boilerplate" />
          <meta property="og:image" content="http://factory.mn/freeze/uUVpNVS2rspdiyDx-6nOkyIct4A.jpg" />
          <meta property="og:description" content="Boilerplate with server side rendering" />
        </Helmet>
        <div className="header">
          <h1>M-React-Boilerplate</h1>
          <p>
            Starter boilerplate app for React/Redux stack with server side rendering. Focused on reaching optimal developer experience.
          </p>
        </div>
        <hr/>
        <h2>Installation</h2>
        <pre>
          yarn   <span className="dim"># (or `npm install` if you prefer npm)</span>
        </pre>
        <h2>Features</h2>
        <ul>
          {
            features.length ? features.map(feature => (
              <li key={feature.name}>
                <h3>
                  {feature.title}
                </h3>
                <p>
                  {feature.description}
                  {/*<Link to="/about/test">*/}
                  {/*go to another page!78978*/}
                  {/*</Link>*/}
                </p>
              </li>
            )) : (
              <PrettyPreloader />
            )
          }
        </ul>

      </div>
    );
  }
}
