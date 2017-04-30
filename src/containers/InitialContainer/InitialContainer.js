if (global.IS_BROWSER) {
  require('./InitialContainer.styl'); // eslint-disable-line global-require
}

import { Link } from 'react-router-dom';

import React, {
  Component,
} from 'react';

import Type from 'prop-types';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import {
  TestActions,
} from '../../actions';

import { DummyComponent } from '../../components';

@connect(state => ({
  testData: state.testReducer
}), dispatch => ({
  dispatch,
  actions: bindActionCreators(TestActions, dispatch)
}))
export default class InitialContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    actions: Type.object,
    testData: Type.object
  };

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    if (!this.props.testData.message) this.props.actions.fetchAction();
  }

  /**
   * Renders 'InitialContainer' component
   */
  render() {
    return (
      <div className="c-initial-container-root">
        message: {this.props.testData.message} {this.props.testData.number}
        <br />
        <DummyComponent />
        <br />
        <Link to="/another">
          go to another page!
        </Link>
        {this.props.testData.foo}
      </div>
    );
  }
}
