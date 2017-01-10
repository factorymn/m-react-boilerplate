import './InitialContainer.styl';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import {
  TestActions,
} from 'actions';

import { DummyComponent } from 'components';

@connect(state => ({
  testData: state.testReducer
}), dispatch => ({
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
    this.props.actions.testAction();
  }

  /**
   * Renders 'InitialContainer' component
   */
  render() {
    console.log('this.props.testData.message ==>', this.props.testData.message);

    return (
      <div className="root">
        <DummyComponent />
      </div>
    );
  }
}
