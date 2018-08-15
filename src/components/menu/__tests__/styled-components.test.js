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
import {List, ListItem} from '../styled-components';

describe('Menu Styled Components', () => {
  test('ListItem - basic render', () => {
    const component = shallow(<ListItem>This is a list item</ListItem>);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'ListItem has correct styles',
    );
  });

  test('ListItem - highlighted render', () => {
    const component = shallow(
      <ListItem $isHighlighted={true}>
        This is a highlighted list item
      </ListItem>,
    );
    expect(component.instance().getStyles()).toMatchSnapshot(
      'ListItem has correct styles when highlighted',
    );
  });

  test('List - basic render', () => {
    const component = shallow(<List />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'List has correct styles',
    );
  });
});
