// @flow
import * as React from 'react';
// Files
import {SELECTION_MODES, STATE_CHANGE_TYPES} from './constants';
// Types
import type {
  DefaultStatefulContainerPropsT,
  StatefulContainerPropsT,
  StatefulContainerStateT,
  StatefulContainerStateChangesT,
  ItemsT,
  GetRequiredInputPropsFnT,
  RenderPropsT,
} from './types';
import type {OnItemSelectFnT} from '../menulist/types';

function noop() {}

export default class AutocompleteStatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StatefulContainerStateT,
> {
  static defaultProps: DefaultStatefulContainerPropsT = {
    mode: SELECTION_MODES.single,
    initialState: {
      selectedItems: [],
      isOpen: false,
      query: '',
    },
    stateReducer: (changeType, changes) => changes,
    onInputChange: noop,
    onInputFocus: noop,
    onInputBlur: noop,
    onItemSelect: noop,
    onClickOutside: noop,
  };

  state: StatefulContainerStateT = {...this.props.initialState};

  // Internal set state function that will also invoke stateReducer
  internalSetState(
    changeType: ?$Keys<typeof STATE_CHANGE_TYPES>,
    changes: StatefulContainerStateChangesT,
  ) {
    const {stateReducer} = this.props;
    // $FlowFixMe
    this.setState(stateReducer(changeType, changes, this.state));
  }

  getFilteredItems(): ItemsT {
    const {query} = this.state;
    const {items, getItemLabel} = this.props;
    const regExp = new RegExp(query, 'ig');
    return items.filter(item => getItemLabel(item).match(regExp));
  }

  onFocus = (event: Event) => {
    if (!this.state.isOpen) {
      this.internalSetState(STATE_CHANGE_TYPES.dropdownOpen, {isOpen: true});
    }
    // Call user-provided handler too if needed
    // $FlowFixMe
    this.props.onInputFocus(event);
  };

  onBlur = (event: Event) => {
    if (this.state.isOpen) {
      this.internalSetState(STATE_CHANGE_TYPES.dropdownClose, {isOpen: false});
    }
    // Call user-provided handler too if needed
    // $FlowFixMe
    this.props.onInputBlur(event);
  };

  onClickOutside = (event: Event) => {
    if (this.state.isOpen) {
      this.internalSetState(STATE_CHANGE_TYPES.dropdownClose, {isOpen: false});
    }
    // Call user-provided handler too if needed
    // $FlowFixMe
    this.props.onClickOutside(event);
  };

  onChange = (event: Event) => {
    // $FlowFixMe
    const query = event.target.value;
    this.internalSetState(STATE_CHANGE_TYPES.queryChange, {query});
    // Call user-provided handler too if needed
    // $FlowFixMe
    this.props.onInputChange(event);
  };

  onItemSelect: OnItemSelectFnT = (item, event) => {
    const {mode} = this.props;
    let {selectedItems} = this.state;
    if (mode === SELECTION_MODES.single) {
      selectedItems = [item];
    } else if (mode === SELECTION_MODES.multiple) {
      selectedItems = [...selectedItems, item];
    }
    this.internalSetState(STATE_CHANGE_TYPES.itemSelect, {selectedItems});
    // Call user-provided handler too if needed
    // $FlowFixMe
    this.props.onItemSelect(item, event);
  };

  getRequiredInputProps: GetRequiredInputPropsFnT = () => {
    return {
      onFocus: this.onFocus,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };
  };

  render() {
    const {children, items, getItemLabel} = this.props;
    return children(
      ({
        ...this.state,
        items,
        getItemLabel,
        filteredItems: this.getFilteredItems(),
        getRequiredInputProps: this.getRequiredInputProps,
      }: RenderPropsT),
    );
  }
}
