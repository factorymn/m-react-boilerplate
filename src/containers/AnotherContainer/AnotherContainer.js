import { Link } from 'react-router';

import React, {
  Component,
  // PropTypes as Type,
} from 'react';

export default class AnotherContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {};

  /**
   * Renders 'InitialContainer' component
   */
  render() {
    return (
      <div className="root">
        Another page=>
        <Link to="/">
          go to main page
        </Link>
      </div>
    );
  }
}
