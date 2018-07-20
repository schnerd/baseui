// @flow
/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import {SELECTION_MODES} from './constants';

export type ItemT = *;

export type ItemsT = Array<ItemT>;

export type GetItemLabelFnT = (item: ItemT) => string;

export type OnItemSelectFnT = (
  selectedItem: ?ItemT,
  event: SyntheticEvent<> | KeyboardEvent,
) => *;

export type GetRequiredInputPropsFnT = () => {
  onChange: EventHandler,
  onBlur: EventHandler,
  onFocus: EventHandler,
};

export type StateReducerFnT = (
  changeType: string,
  changes: StatefulContainerStateT,
  currentState: StatefulContainerStateT,
) => StatefulContainerStateT;

export type StatefulContainerStateT = {
  // currently selected item(s)
  selectedItems: ItemsT,
  // whether dropdown list is shown or not
  isOpen: boolean,
  // current input query
  query: string,
};

export type StatefulContainerStateChangesT = {
  selectedItems?: ItemsT,
  isOpen?: boolean,
  query?: string,
};

export type RenderPropsT = {
  items: ItemsT,
  filteredItems: ItemsT,
  isOpen: $PropertyType<StatefulContainerStateT, 'isOpen'>,
  query: $PropertyType<StatefulContainerStateT, 'query'>,
  selectedItems: $PropertyType<StatefulContainerStateT, 'selectedItems'>,
  getItemLabel: GetItemLabelFnT,
  getRequiredInputProps: GetRequiredInputPropsFnT,
};

/**
 * Component Prop Types
 * ====================
 * Required and Optional are split into separate object types, and internals are all
 * marked as required because otherwise defaultProps will not work properly
 */

export type StatefulContainerPropsT = {
  items: ItemsT,
  getItemLabel: GetItemLabelFnT,
  children: RenderPropsT => React.Node,
  mode?: $Keys<typeof SELECTION_MODES>,
  initialState?: StatefulContainerStateT,
  stateReducer?: StateReducerFnT,
  onInputChange?: EventHandler,
  onInputFocus?: EventHandler,
  onInputBlur?: EventHandler,
  onItemSelect?: OnItemSelectFnT,
  onClickOutside?: EventHandler,
};

export type DefaultStatefulContainerPropsT = {
  mode: $Keys<typeof SELECTION_MODES>,
  initialState: StatefulContainerStateT,
  stateReducer: StateReducerFnT,
  onInputChange: EventHandler,
  onInputFocus: EventHandler,
  onInputBlur: EventHandler,
  onItemSelect: OnItemSelectFnT,
  onClickOutside: EventHandler,
};

export type InjectableComponentPropsT = {
  Root?: React.ComponentType<*>,
  Input?: React.ComponentType<*>,
  ResultList?: React.ComponentType<*>,
  Result?: React.ComponentType<*>,
  SearchIcon?: React.ComponentType<*>,
  CloseIcon?: React.ComponentType<*>,
};

export type StatefulAutocompletePropsT = StatefulContainerPropsT & {
  components?: InjectableComponentPropsT,
};

export type StatelessAutocompletePropsT = {
  items: ItemsT,
  getItemLabel: GetItemLabelFnT,
  isOpen?: $PropertyType<StatefulContainerStateT, 'isOpen'>,
  query?: $PropertyType<StatefulContainerStateT, 'query'>,
  selectedItems?: $PropertyType<StatefulContainerStateT, 'selectedItems'>,
  getRequiredInputProps?: GetRequiredInputPropsFnT,
  components?: InjectableComponentPropsT,
};
