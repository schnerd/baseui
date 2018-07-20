// @flow
/* eslint-disable import/prefer-default-export */
import * as React from 'react';

export type ItemsT = Array<*>;
export type GetItemLabelFnT = (item: *) => string;

export type SetRootRefFnT = (ref: React$ElementRef<*>) => void;
export type RootRefT = React$ElementRef<*>;
export type OnItemSelectFnT = (
  item: ?{},
  event: SyntheticEvent<> | KeyboardEvent,
) => mixed;

export type InjectableComponentPropsT = {
  List?: React.ComponentType<{}>,
  ListItem?: React.ComponentType<{}>,
};

export type RenderItemPropsT = {
  key: string,
  ref?: React$ElementRef<*>,
  // indicates when the item is visually focused
  isHighlighted?: boolean,
  role?: string,
  // indicates when the item is visually focused
  'aria-activedescendant'?: boolean,
};
export type GetRequiredItemPropsFnT = (
  item: {},
  index: number,
) => RenderItemPropsT;

export type StateReducerFnT = (
  changeType: string,
  changes: StatefulContainerStateT,
  currentState: StatefulContainerStateT,
) => StatefulContainerStateT;

export type StatefulContainerStateT = {
  // index of currently highlighted item (from keyboard control)
  highlightedIndex: number,
};

export type RenderPropsT = StatefulContainerStateT & {
  items: ItemsT,
  getItemLabel: GetItemLabelFnT,
  rootRef: RootRefT,
  getRequiredItemProps: GetRequiredItemPropsFnT,
};

/**
 * Component Prop Types
 * ====================
 * Required and Optional are split into separate object types, and internals are all
 * marked as required because otherwise defaultProps will not work properly
 */

export type DefaultStatefulContainerPropsT = {
  initialState: StatefulContainerStateT,
  stateReducer: StateReducerFnT,
  onItemSelect: OnItemSelectFnT,
  children: RenderPropsT => React.Node,
};

export type StatefulContainerPropsT = {
  items: ItemsT,
  getItemLabel: GetItemLabelFnT,
  initialState?: StatefulContainerStateT,
  stateReducer?: StateReducerFnT,
  onItemSelect?: OnItemSelectFnT,
  children?: RenderPropsT => React.Node,
};

export type StatefulMenulistPropsT = StatefulContainerPropsT & {
  components?: InjectableComponentPropsT,
};

export type StatelessMenulistPropsT = {
  items: ItemsT,
  getItemLabel: GetItemLabelFnT,
  rootRef: RootRefT,
  getRequiredItemProps?: GetRequiredItemPropsFnT,
  highlightedIndex?: number,
  components?: InjectableComponentPropsT,
};