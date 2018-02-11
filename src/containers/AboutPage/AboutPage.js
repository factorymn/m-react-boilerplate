if (global.IS_BROWSER) {
  require('./AboutPage.styl');
}

import { Link } from 'react-router-dom';

import React, {
  Component
} from 'react';

// import Type from 'prop-types';

export default class AnotherContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {};

  /**
   * Renders 'AnotherContainer' component
   */
  render() {
    return (
      <div className="c-another-container-root">
        Another page=>
        <Link to="/">
          go to main page
        </Link>
      </div>
    );
  }
}
