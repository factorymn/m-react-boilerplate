if (global.IS_BROWSER) {
  require('./AboutPage.styl');
}

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AboutPageActions from './actions';
import PropTypes from 'prop-types';
import PrettyPreloader from '../../components/PrettyPreloader';

@connect(state => ({
  aboutPage: state.aboutPageReducer
}), dispatch => ({
  dispatch,
  actions: bindActionCreators(AboutPageActions, dispatch)
}))
export default class AboutPage extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    aboutPage: PropTypes.object,
    actions: PropTypes.object
  };

  componentDidMount() {
    if (!this.props.aboutPage.message) {
      this.props.actions.fetchMessage();
    }
  }

  /**
   * Renders 'AboutPage' component
   */
  render() {
    return (
      <div className="c-about-page-root">
        <div className="header">
          <h1>M-React-Boilerplate</h1>
          <div>
            {this.props.aboutPage.message ? this.props.aboutPage.message : <PrettyPreloader />}
          </div>
          <br/>
          <Link to="/">
            Go to Documentation page.
          </Link>
        </div>
      </div>
    );
  }
}
