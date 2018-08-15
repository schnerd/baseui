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
/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import type {OverrideT} from '../../helpers/overrides';
import {STATE_CHANGE_TYPES} from './constants';

export type ItemsT = Array<*>;

export type GetItemLabelFnT = (item: *) => string;

export type SetRootRefFnT = (ref: React$ElementRef<*>) => void;

export type RootRefT = React$ElementRef<*>;

export type OnItemSelectFnT = (
  item: ?{},
  event: SyntheticEvent<> | KeyboardEvent,
) => mixed;

export type OverridesT = {
  List?: OverrideT<*>,
  ListItem?: OverrideT<*>,
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
  changeType: $Keys<typeof STATE_CHANGE_TYPES>,
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

export type StatefulMenuPropsT = StatefulContainerPropsT & {
  overrides?: OverridesT,
};

export type StatelessMenuPropsT = {
  items: ItemsT,
  getItemLabel: GetItemLabelFnT,
  rootRef: RootRefT,
  getRequiredItemProps?: GetRequiredItemPropsFnT,
  highlightedIndex?: number,
  overrides?: OverridesT,
};
