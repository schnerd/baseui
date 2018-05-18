// @flow
import React, {Component} from 'react';
import get from 'lodash.get';
import cloneDeep from 'lodash.clonedeep';
import keycode from 'keycode';
import {styled} from 'styletron-react';
import {BaseSearchResultList, utils} from '../search';
import type {SearchResultListProps, BaseSearchOption} from '../search';
import {boxShadows} from '../styles';
import type {StyleProps} from '../common';
import {KeyUpListener, KeyDownListener} from '../common';
import {BaseInputTextMinimal} from '../input';
import type {SetFocusedIdParams} from '../search/utils';

const MainContainer = styled('div', (props: {style?: StyleProps}) => {
  const {style} = props;
  return {
    boxShadow: boxShadows.floatingResult,
    position: 'absolute',
    top: '20px',
    left: 0,
    right: '10px',
    ...style,
  };
});

type Props = {
  $optionList: Array<BaseSearchOption>,
  $onSelectItem: (item: BaseSearchOption) => void,
  $selectedOption: ?BaseSearchOption,

  // Optionals
  $closeList: () => void,
  $isOptionListShown: boolean,
  $showSearch: boolean,

  // Components
  /*
  You can override the search result list completely if you'd like by using this props.
  Just make sure you assign the props accordingly like the default one: `BaseSearchResultList`
   */
  $searchResultListComponent?: SearchResultListProps => React$Node,
};

type State = {
  searchText: string,
  optionList: $PropertyType<Props, '$optionList'>,
  currentFocusedId: string,
};

class BaseDropdownOptions extends Component<Props, State> {
  divContainer: ?HTMLElement;
  inputEl: ?HTMLInputElement;
  itemListContainer: ?HTMLUListElement;

  static defaultProps = {
    $closeList: () => {},
    $isOptionListShown: false,
    $defaultSearchText: '',
    $showSearch: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: '',
      optionList: cloneDeep(props.$optionList),
      currentFocusedId: get(props.$selectedOption, 'id'),
    };
    (this: any).onSearchChange = this.onSearchChange.bind(this);
    (this: any).handleGlobalKeyup = this.handleGlobalKeyup.bind(this);
    (this: any).handleGlobalKeydown = this.handleGlobalKeydown.bind(this);
    (this: any).clearFocusedId = this.clearFocusedId.bind(this);
    (this: any).onSelectItem = this.onSelectItem.bind(this);
    (this: any).setSearchText = this.setSearchText.bind(this);
    (this: any).setFocusedId = this.setFocusedId.bind(this);
    (this: any).focusInput = this.focusInput.bind(this);
    (this: any).blurInput = this.blurInput.bind(this);
  }

  componentDidMount() {
    // Reposition scroll so that selected element is shown
    this.resultRepositionScroll(keycode('down'));
  }

  // componentWillReceiveProps(nextProps: Props) {
  //   const {
  //     $optionList: curOptionList,
  //   } = this.props;
  //   const {
  //     $optionList: optionList,
  //   } = nextProps;
  //   const nextState = {};
  //   if (!isEqual(optionList, curOptionList)) {
  //     nextState.optionList = optionList;
  //     nextState.searchText = '';
  //     nextState.currentFocusedId = '';
  //   }
  //   if (Object.keys(nextState).length === 0) {
  //     return;
  //   }
  //   this.setState(nextState);
  // }

  onSelectItem(item: BaseSearchOption) {
    const {$onSelectItem, $closeList} = this.props;
    /*
    When item is selected, we need to close the search result and unfocus the input
     */
    this.blurInput();
    $onSelectItem(item);
    $closeList();
  }

  onSearchChange(evt: SyntheticInputEvent<HTMLInputElement>) {
    const {value} = evt.target;
    this.setSearchText(value);
  }

  setSearchText(text: string) {
    this.setState({
      searchText: text,
      optionList: utils.getNewOptionList({
        searchText: text,
        optionList: this.props.$optionList,
      }),
    });
  }

  setFocusedId({nextFocusedId, keyCode}: SetFocusedIdParams) {
    this.setState(
      {
        currentFocusedId: nextFocusedId,
      },
      () => {
        this.resultRepositionScroll(keyCode);
      }
    );
  }

  resultRepositionScroll(keyCode: number) {
    /*
    Call this method after state has changed

    Find all the total heights first from all items, then adjust the scroll
     */
    const {optionList, currentFocusedId} = this.state;
    if (!this.divContainer || !this.itemListContainer) {
      return;
    }
    utils.resultRepositionScroll({
      itemListContainer: this.itemListContainer,
      allItemEls: this.divContainer.querySelectorAll('ul > li'),
      optionList,
      currentFocusedId,
      keyCode,
    });
  }

  focusInput() {
    const {inputEl} = this;
    if (inputEl) {
      inputEl.focus();
      const value = this.state.searchText;
      setTimeout(() => {
        // Put cursor at the end
        inputEl.setSelectionRange(value.length, value.length);
      });
    }
  }

  blurInput() {
    const {inputEl} = this;
    if (inputEl) {
      inputEl.blur();
    }
  }

  clearFocusedId() {
    this.setState({
      currentFocusedId: '',
    });
  }

  handleKeyEscape() {
    const {$closeList} = this.props;
    const {searchText, currentFocusedId} = this.state;
    utils.handleKeyEscape({
      closeList: $closeList,
      searchText,
      currentFocusedId,
      clearFocusedId: this.clearFocusedId,
      focusInput: this.focusInput,
      setSearchText: this.setSearchText,
    });
  }

  handleKeyDown() {
    const {$isOptionListShown} = this.props;
    const {currentFocusedId, optionList} = this.state;
    utils.handleKeyDown({
      isListShown: $isOptionListShown,
      currentFocusedId,
      optionList,
      setFocusedId: this.setFocusedId,
      blurInput: this.blurInput,
    });
  }

  handleKeyUp() {
    const {$isOptionListShown, $showSearch} = this.props;
    const {currentFocusedId, optionList} = this.state;
    utils.handleKeyUp({
      isListShown: $isOptionListShown,
      currentFocusedId,
      optionList,
      focusInput: this.focusInput,
      setFocusedId: this.setFocusedId,
      isSearchShown: $showSearch,
    });
  }

  handleKeyEnter() {
    const {$isOptionListShown} = this.props;
    const {currentFocusedId, optionList} = this.state;
    if (!$isOptionListShown || !currentFocusedId) {
      return;
    }
    const selectedItem = optionList.find(so => so.id === currentFocusedId);
    if (!selectedItem) {
      return;
    }
    this.onSelectItem(selectedItem);
  }

  handleGlobalKeyup(evt: KeyboardEvent) {
    const {$isOptionListShown} = this.props;
    if (!$isOptionListShown) {
      // Not open, don't do anything
      return null;
    }
    switch (evt.keyCode) {
      case keycode('esc'):
        return this.handleKeyEscape();
      case keycode('enter'):
        return this.handleKeyEnter();
      default:
        break;
    }

    return null;
  }

  handleGlobalKeydown(evt: KeyboardEvent) {
    const {$isOptionListShown} = this.props;
    if (!$isOptionListShown) {
      // Not open, don't do anything
      return null;
    }
    switch (evt.keyCode) {
      case keycode('up'):
        return this.handleKeyUp();
      case keycode('down'):
        return this.handleKeyDown();
      default:
        break;
    }

    return null;
  }

  render() {
    const {
      $selectedOption,
      $showSearch,
      $searchResultListComponent: SearchResultListComponent,
    } = this.props;
    const {searchText, optionList, currentFocusedId} = this.state;

    const searchResultListProps = {
      $searchOptions: optionList,
      $selectedSearchOption: $selectedOption,
      $currentFocusedId: currentFocusedId,
      $refItemListContainer: c => (this.itemListContainer = c),
      $onSelectItem: this.onSelectItem,
      $clearFocusedId: this.clearFocusedId,
    };

    return (
      <MainContainer $ref={c => (this.divContainer = c)}>
        <KeyUpListener handleKey={this.handleGlobalKeyup} />
        <KeyDownListener handleKey={this.handleGlobalKeydown} />
        {$showSearch && (
          <BaseInputTextMinimal
            $ref={c => (this.inputEl = c)}
            value={searchText}
            onChange={this.onSearchChange}
            placeholder="Search"
            // This padding matches the search result item's padding
            style={{padding: '8px 16px'}}
            autoFocus
          />
        )}
        {SearchResultListComponent !== undefined ? (
          <SearchResultListComponent {...searchResultListProps} />
        ) : (
          <BaseSearchResultList {...searchResultListProps} />
        )}
      </MainContainer>
    );
  }
}

export default BaseDropdownOptions;
