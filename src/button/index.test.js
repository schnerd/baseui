// @flow

import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from './button';

Enzyme.configure({adapter: new Adapter()});

test('<Button />', () => {
  const wrapper = shallow(<Button onClick={() => {}}>it is a button!</Button>);

  expect(wrapper.text()).toEqual(expect.any(String));
});
