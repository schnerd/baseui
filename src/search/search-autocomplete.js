// @flow
import React, {Component} from 'react';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import keycode from 'keycode';
import {styled} from 'styletron-react';
import {BaseSearchResultList} from './index';
import {BaseInputTextMinimal} from '../input';
import type {BaseSearchOption} from './index';
import {KeyUpListener, KeyDownListener, ClickOutsideListener} from '../common';
import type {StyleProps} from '../common';
import {boxShadows, hexColors} from '../styles';
import utils from './utils';
import type {SetFocusedIdParams} from './utils';

const BaseFloatingResultContainer = styled(
  'div',
  (props: {style?: StyleProps}) => {
    const {style} = props;
    return {
      backgroundColor: hexColors.white,
      position: 'absolute',
      top: '28px',
      left: 0,
      right: '20px',
      boxShadow: boxShadows.floatingResult,
      borderRadius: '4px',
      ...style,
    };
  }
);

const MainContainer = styled('div', (props: {style?: StyleProps}) => {
  const {style} = props;
  return {
    position: 'relative',
    ...style,
  };
});

/*
This component is being used for dropdown
 */
type Props = {|
  $searchText?: string, // optional for dropdown
  $searchOptions: Array<BaseSearchOption>,
  $selectedSearchOption: ?BaseSearchOption,
  $shouldKeyUpStopPropagation: boolean,
  $onKeyUpStopPropagation?: (evt: KeyboardEvent) => void,
  $onSelectItem: (selectedItem: BaseSearchOption) => void,

  // These were added with dropdown in mind
  $showResultList?: boolean,
  $closeList: () => void,
|};

type State = {
  searchText: string,
  searchOptions: Array<BaseSearchOption>,
  showResultList: boolean,
  currentFocusedId: string,
};

class BaseSearchAutoComplete extends Component<Props, State> {
  divContainer: ?HTMLElement;
  inputEl: ?HTMLInputElement;
  itemListContainer: ?HTMLUListElement;

  static defaultProps = {
    $shouldKeyUpStopPropagation: true,
    $closeList: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: '',
      searchOptions: cloneDeep(props.$searchOptions),
      showResultList: false,
      currentFocusedId: '',
    };
    (this: any).onSearchChange = this.onSearchChange.bind(this);
    (this: any).onInputFocus = this.onInputFocus.bind(this);
    (this: any).handleGlobalClick = this.handleGlobalClick.bind(this);
    (this: any).handleGlobalKeyup = this.handleGlobalKeyup.bind(this);
    (this: any).handleGlobalKeydown = this.handleGlobalKeydown.bind(this);
    (this: any).clearFocusedId = this.clearFocusedId.bind(this);
    (this: any).onSelectItem = this.onSelectItem.bind(this);
    (this: any).closeList = this.closeList.bind(this);
    (this: any).setSearchText = this.setSearchText.bind(this);
    (this: any).setFocusedId = this.setFocusedId.bind(this);
    (this: any).focusInput = this.focusInput.bind(this);
    (this: any).blurInput = this.blurInput.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      $searchText: curSearchText,
      $searchOptions: curSearchOptions,
      $selectedSearchOption: curSelectedSearchOption,
      $showResultList: curShowResultList,
    } = this.props;
    const {
      $searchText: searchText,
      $searchOptions: searchOptions,
      $selectedSearchOption: selectedSearchOption,
      $showResultList: showResultList,
    } = nextProps;
    const nextState = {};
    if (searchText !== curSearchText) {
      nextState.searchText = searchText;
    }
    if (!isEqual(selectedSearchOption, curSelectedSearchOption)) {
      nextState.selectedSearchOption = selectedSearchOption;
    }
    if (!isEqual(searchOptions, curSearchOptions)) {
      nextState.searchOptions = searchOptions;
    }
    if (!isEqual(showResultList, curShowResultList)) {
      nextState.showResultList = showResultList;
    }
    if (Object.keys(nextState).length === 0) {
      return;
    }
    // $FlowFixMe seriously, this works just fine. Stop complaining.
    this.setState(nextState);
  }

  onSelectItem(item: BaseSearchOption) {
    const {$onSelectItem, $closeList} = this.props;
    /*
    When item is selected, we need to close the search result and unfocus the input
     */
    this.blurInput();
    this.setState({
      showResultList: false,
    });
    $onSelectItem(item);
    $closeList();
  }

  onSearchChange(evt: SyntheticInputEvent<HTMLInputElement>) {
    const {value} = evt.target;
    this.setSearchText(value);
  }

  onInputFocus(evt: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      showResultList: true,
    });
  }

  setSearchText(text: string) {
    const newSearchOptions = utils.getNewOptionList({
      optionList: this.props.$searchOptions,
      searchText: text,
    });
    this.setState({
      searchText: text,
      searchOptions: newSearchOptions,
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
    const {searchOptions, currentFocusedId} = this.state;
    if (!this.divContainer || !this.itemListContainer) {
      return;
    }
    utils.resultRepositionScroll({
      itemListContainer: this.itemListContainer,
      allItemEls: this.divContainer.querySelectorAll('ul > li'),
      optionList: searchOptions,
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

  handleGlobalClick() {
    this.setState({showResultList: false});
  }

  closeList() {
    this.setState(
      {
        showResultList: false,
        // Reset the focus
        currentFocusedId: '',
      },
      () => {
        // Force unfocus on input
        this.blurInput();
      }
    );
  }

  handleKeyEscape() {
    const {searchText, currentFocusedId} = this.state;
    utils.handleKeyEscape({
      closeList: this.closeList,
      searchText,
      currentFocusedId,
      clearFocusedId: this.clearFocusedId,
      focusInput: this.focusInput,
      setSearchText: this.setSearchText,
    });
  }

  handleKeyDown() {
    const {showResultList, currentFocusedId, searchOptions} = this.state;
    utils.handleKeyDown({
      isListShown: showResultList,
      currentFocusedId,
      optionList: searchOptions,
      setFocusedId: this.setFocusedId,
      blurInput: this.blurInput,
    });
  }

  handleKeyUp() {
    const {showResultList, currentFocusedId, searchOptions} = this.state;
    utils.handleKeyUp({
      isListShown: showResultList,
      currentFocusedId,
      optionList: searchOptions,
      focusInput: this.focusInput,
      setFocusedId: this.setFocusedId,
    });
  }

  handleKeyEnter() {
    const {showResultList, currentFocusedId, searchOptions} = this.state;
    if (!showResultList || !currentFocusedId) {
      return;
    }
    const selectedItem = searchOptions.find(so => so.id === currentFocusedId);
    if (!selectedItem) {
      return;
    }
    this.onSelectItem(selectedItem);
  }

  handleGlobalKeyup(evt: KeyboardEvent) {
    const {showResultList} = this.state;
    if (!showResultList) {
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
    const {showResultList} = this.state;
    if (!showResultList) {
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
      $selectedSearchOption,
      $shouldKeyUpStopPropagation,
      $onKeyUpStopPropagation,
      $searchText,
      ...rest
    } = this.props;
    const {
      searchText,
      searchOptions,
      showResultList,
      currentFocusedId,
    } = this.state;

    return (
      <MainContainer $ref={c => (this.divContainer = c)} {...rest}>
        <ClickOutsideListener handleClick={evt => this.handleGlobalClick()} />
        <KeyUpListener
          handleKey={this.handleGlobalKeyup}
          shouldKeyStopPropagation={$shouldKeyUpStopPropagation}
          onKeyStopPropagation={$onKeyUpStopPropagation}
        />
        <KeyDownListener handleKey={this.handleGlobalKeydown} />
        <BaseInputTextMinimal
          $ref={c => (this.inputEl = c)}
          value={searchText}
          onChange={this.onSearchChange}
          onFocus={this.onInputFocus}
          defaultValue={$searchText}
        />
        {showResultList && (
          <BaseFloatingResultContainer>
            <BaseSearchResultList
              $searchOptions={searchOptions}
              $selectedSearchOption={$selectedSearchOption}
              $currentFocusedId={currentFocusedId}
              $refItemListContainer={c => (this.itemListContainer = c)}
              $onSelectItem={this.onSelectItem}
              $clearFocusedId={this.clearFocusedId}
            />
          </BaseFloatingResultContainer>
        )}
      </MainContainer>
    );
  }
}

export default BaseSearchAutoComplete;
