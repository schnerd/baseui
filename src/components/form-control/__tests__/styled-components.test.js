/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
  Label as StyledLabel,
  Caption as StyledCaption,
} from '../styled-components';

describe('FormControl - Label and Caption for controls', () => {
  test('StyledLabel - basic render', () => {
    const component = shallow(<StyledLabel>Label</StyledLabel>);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledLabel has correct default styles',
    );
    component.setProps({
      $disabled: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledLabel has correct styles when compact and disabled',
    );
  });

  test('StyledCaption - basic render', () => {
    const component = shallow(<StyledCaption>Caption</StyledCaption>);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledCaption has correct default styles',
    );
    component.setProps({
      $error: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledCaption has correct styles when compact and error is boolean',
    );
    component.setProps({
      $error: 'Error message',
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledCaption has correct styles when error is a string',
    );
  });
});
