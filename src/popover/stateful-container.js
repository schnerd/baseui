// @flow
import * as React from 'react';
import type {
  PopoverPropsWithoutChildren,
  StatefulPopoverContainerProps,
  State,
} from './types';

import {PLACEMENT, TRIGGER_TYPE} from './constants';

class StatefulContainer extends React.Component<
  StatefulPopoverContainerProps,
  State,
> {
  static defaultProps = {
    dismissOnClickOutside: true,
    dismissOnEsc: true,
    placement: PLACEMENT.auto,
    showArrow: false,
    triggerType: TRIGGER_TYPE.click,
  };

  state = {
    isOpen: false,
    ...this.props.initialState,
  };

  onBlur = () => {
    this.close();
  };

  onClick = () => {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  onClickOutside = () => {
    this.close();
  };

  onEsc = () => {
    this.close();
  };

  onFocus = () => {
    this.open();
  };

  onMouseEnter = () => {
    this.open();
  };

  onMouseLeave = () => {
    this.close();
  };

  open() {
    this.setState({
      isOpen: true,
    });
  }

  close() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const {
      dismissOnClickOutside,
      dismissOnEsc,
      components,
      content,
      onMouseEnterDelay,
      onMouseLeaveDelay,
      placement,
      showArrow,
      triggerType,
    } = this.props;

    const popoverProps: PopoverPropsWithoutChildren = {
      isOpen: this.state.isOpen,
      components,
      content,
      onMouseEnterDelay,
      onMouseLeaveDelay,
      placement,
      showArrow,
      triggerType,
    };

    if (dismissOnClickOutside) {
      popoverProps.onClickOutside = this.onClickOutside;
    }
    if (dismissOnEsc) {
      popoverProps.onEsc = this.onEsc;
    }
    if (triggerType === TRIGGER_TYPE.hover) {
      popoverProps.onBlur = this.onBlur;
      popoverProps.onFocus = this.onFocus;
      popoverProps.onMouseEnter = this.onMouseEnter;
      popoverProps.onMouseLeave = this.onMouseLeave;
    } else {
      popoverProps.onClick = this.onClick;
    }

    return this.props.children(popoverProps);
  }
}

export default StatefulContainer;
