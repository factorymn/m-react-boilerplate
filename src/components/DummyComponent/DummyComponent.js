import React, {
  Component,
  // PropTypes as Type,
} from 'react';

export default class DummyComponent extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {};

  /**
   * Renders 'DummyComponent' component
   */
  render() {
    return (
      <div className="some-class-name">Let's write codess!</div>
    );
  }
}
