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
import {mount} from 'enzyme';
import {List, ListItem} from '../styled-components';
import Menu from '../menu';

const mockItems = [{label: 'item1'}, {label: 'item2'}];

function getSharedProps() {
  return {
    items: mockItems,
    getItemLabel: item => item.label,
    rootRef: React.createRef(),
    overrides: {
      List,
      ListItem,
    },
  };
}

describe('Menu Stateless Component', () => {
  test('basic renders', () => {
    // $FlowFixMe
    const component = mount(<Menu {...getSharedProps()} />);

    expect(component.find(List)).toExist();
    expect(component.find(List)).toHaveProp({
      $ref: React.createRef(),
    });

    expect(component.find(ListItem)).toExist();
    expect(component.find(ListItem).first()).toHaveProp({});

    expect(
      component
        .find(ListItem)
        .first()
        .text(),
    ).toEqual(mockItems[0].label);

    component.setProps({
      getRequiredItemProps: (item, index) => ({
        key: String(index),
        isHighlighted: true,
      }),
    });
    expect(component.find(ListItem).first()).toHaveProp({
      $isHighlighted: true,
    });
  });

  test('renders with components overrides', () => {
    const NewListItem = jest
      .fn()
      .mockImplementation(() => <div id="list-item" />);
    const props = {
      ...getSharedProps(),
      overrides: {
        ListItem: NewListItem,
      },
    };
    // $FlowFixMe
    const component = mount(<Menu {...props} />);
    expect(component.find(ListItem)).not.toExist();
    expect(component.find(NewListItem)).toExist();
  });
});
