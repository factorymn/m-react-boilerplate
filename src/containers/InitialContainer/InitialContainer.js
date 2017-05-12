if (global.IS_BROWSER) {
  require('./InitialContainer.styl'); // eslint-disable-line global-require
}

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
        <Helmet>
          <title>Manufactura boilerplate</title>
          <meta property="og:title" content="Manufactura boilerplate" />
          <meta property="og:image" content="http://factory.mn/freeze/uUVpNVS2rspdiyDx-6nOkyIct4A.jpg" />
          <meta property="og:description" content="Boilerplate with server side rendering" />
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
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
