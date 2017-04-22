if (global.IS_BROWSER) {
  require('./InitialContainer.styl'); // eslint-disable-line global-require
}

import { Link } from 'react-router-dom';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

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

  static initialFetchData = [
    ({ store }) => store.dispatch(TestActions.fetchAction()),
    ({ store }) => store.dispatch(TestActions.anotherFetchAction())
  ];

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
      <div className="root">
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
