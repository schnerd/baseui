// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import {PLACEMENT, STATE_CHANGE_TYPE, TRIGGER_TYPE} from './constants';

export type PopoverPlacement = $Keys<typeof PLACEMENT>;

export type TriggerType = $Keys<typeof TRIGGER_TYPE>;

export type State = {
  isOpen: boolean,
};

export type StateChangeType = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducer = (
  stateChangeType: StateChangeType,
  nextState: State,
  currentState: State,
  event?: Event,
) => State;

export type ContentRenderProp = ({
  close?: () => void,
}) => React.Node;

export type ComponentsProp = {|
  PopoverBody?: React.ComponentType<mixed>,
  PopoverArrow?: React.ComponentType<mixed>,
  PopoverInner?: React.ComponentType<mixed>,
|};

// Basically React.Node minus React.Portal and Iterable
export type ChildType =
  | void
  | null
  | boolean
  | number
  | string
  // eslint-disable-next-line flowtype/no-weak-types
  | React.Element<any>;

export type ChildrenType = React.ChildrenArray<ChildType>;

// Props shared by all flavors of popover
export type BasePopoverProps = {
  components?: ComponentsProp,
  content: React.Node | ContentRenderProp,
  onMouseEnterDelay?: number,
  onMouseLeaveDelay?: number,
  placement: PopoverPlacement,
  showArrow?: boolean,
  triggerType: TriggerType,
};

// Props for stateless render logic
export type PopoverProps = BasePopoverProps & {
  children: ChildrenType,
  isOpen: boolean,
  onClick?: (e: Event) => void,
  onClickOutside?: () => void,
  onEsc?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

// Props for stateful wrapper
export type StatefulPopoverProps = BasePopoverProps & {
  children: ChildrenType,
  dismissOnClickOutside: boolean,
  dismissOnEsc: boolean,
  initialState?: State,
  onClose?: () => void,
  onOpen?: () => void,
  stateReducer?: StateReducer,
};

// Props for state container
export type StatefulPopoverContainerProps = $Diff<
  StatefulPopoverProps,
  {children: ChildrenType},
> & {
  children: (
    props: $Diff<PopoverProps, {children: ChildrenType}>,
  ) => React.Node,
};

export type PositionStyles = {
  top?: number | string,
  left?: number | string,
};

export type PopperDataObject = {
  arrowStyles?: {
    top?: number | string,
    left?: number | string,
  },
  styles?: {
    top?: number | string,
    left?: number | string,
  },
  placement: string,
};

export type PopperOptions = {
  placement: string,
  modifiers: {
    arrow: {},
    computeStyle: {},
    applyStyle: {},
    applyReactStyle: {
      fn: (data: PopperDataObject) => void,
    },
  },
};

export type PopoverPrivateState = {
  isAnimating: boolean,
  arrowStyles: PositionStyles,
  positionStyles: PositionStyles,
  placement: PopoverPlacement,
};

export type AnchorProps = {
  onMouseEnter?: (e: Event) => void,
  onMouseLeave?: (e: Event) => void,
  onClick?: (e: Event) => void,
  /* eslint-disable flowtype/no-weak-types */
  // TODO: Get this to work without 'any'
  ref?: React.Ref<any>,
  $ref?: React.Ref<any>,
  /* eslint-enable flowtype/no-weak-types */
};
