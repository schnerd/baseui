// @flow

import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BaseButton} from './index';

Enzyme.configure({adapter: new Adapter()});

test('<BaseButton />', () => {
  const wrapper = shallow(<BaseButton onClick={() => {}} />);
  expect(wrapper.text()).toBe('');
});
