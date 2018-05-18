// @flow
import React, {Component} from 'react';
import {BaseDropdownDisplay} from './base';
import {commonUtils, ClickOutsideListener} from '../common';
import {hexColors} from '../styles';
import BaseDropdownOptions from './dropdown-options';
import type {BaseSearchOption} from '../search';

/*
Dropdown is mainly using search autocomplete components.
Let it be the search box, search results, etc.
 */
type Props = {
  $selectedOption: ?BaseSearchOption,
  $optionList: Array<BaseSearchOption>,
  $onSelectItem: (option: BaseSearchOption) => void,
  $showSearch: boolean,

  // Components
  $dropdownDisplay?: React$Node | Function,
};

type State = {
  isOptionListShown: boolean,
};

class BaseDropdown extends Component<Props, State> {
  static defaultProps = {
    $showSearch: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isOptionListShown: false,
    };
    (this: any).onDropdownClick = this.onDropdownClick.bind(this);
    (this: any).closeList = this.closeList.bind(this);
    (this: any).onSelectItem = this.onSelectItem.bind(this);
  }

  onDropdownClick() {
    this.setState({isOptionListShown: !this.state.isOptionListShown});
  }

  onSelectItem(item: BaseSearchOption) {
    const {$onSelectItem} = this.props;
    $onSelectItem(item);
  }

  closeList() {
    this.setState({isOptionListShown: false});
  }

  render() {
    const {
      $dropdownDisplay,
      $selectedOption,
      $optionList,
      $showSearch,
    } = this.props;
    const {isOptionListShown} = this.state;
    return (
      <div style={{position: 'relative'}}>
        <ClickOutsideListener handleClick={this.closeList} />
        <div onClick={this.onDropdownClick}>
          {$dropdownDisplay !== undefined ? (
            commonUtils.getRenderedEl($dropdownDisplay, this.props)
          ) : (
            <BaseDropdownDisplay>
              {($selectedOption &&
                ($selectedOption.name || $selectedOption.id)) || (
                <div style={{color: hexColors.gray60}}>Select one</div>
              )}
            </BaseDropdownDisplay>
          )}
        </div>
        {isOptionListShown && (
          <BaseDropdownOptions
            $optionList={$optionList}
            $onSelectItem={this.onSelectItem}
            $selectedOption={$selectedOption}
            $closeList={this.closeList}
            $isOptionListShown={isOptionListShown}
            $showSearch={$showSearch}
          />
        )}
      </div>
    );
  }
}

export default BaseDropdown;
