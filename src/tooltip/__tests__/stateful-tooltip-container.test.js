/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StatefulContainer as StatefulPopoverContainer} from '../../popover';
import {
  StatefulContainer as StatefulTooltipContainer,
  PLACEMENT,
  TRIGGER_TYPE,
} from '../index';
import baseDefaultProps from '../default-props';

describe('StatefulTooltipContainer', () => {
  test('basic render', () => {
    const props = {
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
      onMouseEnterDelay: 100,
      onMouseLeaveDelay: 200,
      onClose: jest.fn(),
      onOpen: jest.fn(),
      placement: PLACEMENT.topLeft,
      showArrow: true,
      stateReducer: jest.fn(),
      triggerType: TRIGGER_TYPE.hover,
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulTooltipContainer {...props}>
        {children}
      </StatefulTooltipContainer>,
    );

    // Should just delegate to StatefulPopoverContainer
    expect(component.type()).toEqual(StatefulPopoverContainer);
    expect(component.props()).toEqual({
      ...baseDefaultProps,
      ...props,
      children,
      dismissOnClickOutside: true,
      dismissOnEsc: true,
    });
  });
});
