if (global.IS_BROWSER) {
  require('./AboutPage.styl');
}

import { Link } from 'react-router-dom';

import React, { Component } from 'react';

// import PropTypes from 'prop-types';

export default class AboutPage extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {};

  /**
   * Renders 'AboutPage' component
   */
  render() {
    return (
      <div className="c-about-page-root">
        <div className="header">
          <h1>M-React-Boilerplate</h1>
          <p>
            Made in Manufactura in Voronezh in Russia.
          </p>
          <Link to="/">
            Go to Documentation page.
          </Link>
        </div>
      </div>
    );
  }
}
