import React from 'react';
import { shallow } from 'enzyme';

import DummyComponent from '../DummyComponent';

describe('<DummyComponent />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = shallow(<DummyComponent />);
    expect(renderedComponent.type()).toEqual('div'); // eslint-disable-line
  });
});
