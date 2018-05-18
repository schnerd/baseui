// @flow
import keycode from 'keycode';
import get from 'lodash.get';
import type {BaseSearchOption} from './search-result-list';

type VoidFunc = () => void;
const keyCodeUp = keycode('up');
const keyCodeDown = keycode('down');

function resultRepositionScroll(props: {
  itemListContainer: ?HTMLElement,
  allItemEls: NodeList<HTMLElement>,
  optionList: Array<{id: string, [key: string]: any}>,
  currentFocusedId: string,
  keyCode: number,
}) {
  /*
  This method is mainly to adjust dropdown / autocomplete result with key listeners.
  So when you keep tapping the key down / up, it will adjust the scroll based on the position of the
  focused element.

  Call this method after state has changed

  Find all the total heights first from all items, then adjust the scroll
   */
  const {
    itemListContainer,
    allItemEls,
    optionList,
    currentFocusedId,
    keyCode,
  } = props;
  if (!itemListContainer) {
    return;
  }

  const isKeyUp = keyCode === keyCodeUp;
  const isKeyDown = keyCode === keyCodeDown;

  // Find the end index
  const endIdx = optionList.findIndex(so => so.id === currentFocusedId);

  // Get all the height
  let totalHeight = 0;
  let lastElHeight = 0;
  allItemEls.forEach((el, idx) => {
    if ((isKeyUp && idx >= endIdx) || (isKeyDown && idx > endIdx)) {
      return;
    }
    totalHeight += el.offsetHeight;
    lastElHeight = el.offsetHeight;
  });

  // Make sure total height is bigger than the container
  const itemListContainerHeight = itemListContainer.offsetHeight;
  if (isKeyDown) {
    if (totalHeight > itemListContainerHeight) {
      itemListContainer.scrollTop =
        totalHeight - itemListContainerHeight + lastElHeight;
    }
    // TODO looks like we don't need this
    // else if (totalHeight < itemListContainer.scrollTop) {
    //   itemListContainer.scrollTop = totalHeight;
    // }
  } else if (isKeyUp && totalHeight < itemListContainer.scrollTop) {
    const newScrollTop = itemListContainer.scrollTop - lastElHeight;
    if (newScrollTop < lastElHeight) {
      itemListContainer.scrollTop = 0;
    } else {
      itemListContainer.scrollTop = newScrollTop;
    }
  }
}

function handleKeyEscape(props: {
  closeList: VoidFunc,
  searchText: string,
  currentFocusedId: string,
  clearFocusedId: VoidFunc,
  focusInput: VoidFunc,
  setSearchText: string => void,
}) {
  const {
    closeList,
    searchText,
    currentFocusedId,
    clearFocusedId,
    focusInput,
    setSearchText,
  } = props;
  if (currentFocusedId) {
    clearFocusedId();
    focusInput();
    return;
  }
  if (searchText) {
    setSearchText('');
    return;
  }
  closeList();
}

type SetFocusedIdParams = {
  nextFocusedId: string,
  keyCode: keyCodeDown | keyCodeUp,
};

function handleKeyDown(props: {
  isListShown: boolean,
  currentFocusedId: string,
  optionList: Array<BaseSearchOption>,
  setFocusedId: SetFocusedIdParams => void,
  blurInput: VoidFunc,
}) {
  const {
    isListShown,
    currentFocusedId,
    optionList,
    setFocusedId,
    blurInput,
  } = props;
  if (!isListShown) {
    return;
  }
  let nextFocusedId = '';
  if (currentFocusedId) {
    // Get the index from optionList
    const currentFocusedIdx = optionList.findIndex(
      so => so.id === currentFocusedId
    );
    const tempNextFocusedId = get(optionList[currentFocusedIdx + 1], 'id');
    if (tempNextFocusedId) {
      nextFocusedId = tempNextFocusedId;
    } else if (!tempNextFocusedId) {
      // Keep the same
      nextFocusedId = currentFocusedId;
    }
  } else {
    nextFocusedId = get(optionList[0], 'id') || '';
    blurInput();
  }
  setFocusedId({
    nextFocusedId,
    keyCode: keycode('down'),
  });
}

function handleKeyUp(props: {
  isListShown: boolean,
  currentFocusedId: string,
  optionList: Array<BaseSearchOption>,
  setFocusedId: SetFocusedIdParams => void,
  focusInput: VoidFunc,
  isSearchShown?: boolean,
}) {
  const {
    isListShown,
    currentFocusedId,
    optionList,
    focusInput,
    setFocusedId,
    isSearchShown,
  } = props;
  if (!isListShown) {
    return;
  }
  let nextFocusedId = '';
  if (currentFocusedId) {
    // Get the index from optionList
    const currentFocusedIdx = optionList.findIndex(
      so => so.id === currentFocusedId
    );
    const tempNextFocusedId = get(optionList[currentFocusedIdx - 1], 'id');
    if (tempNextFocusedId) {
      nextFocusedId = tempNextFocusedId;
    } else if (!tempNextFocusedId && isSearchShown) {
      focusInput();
    } else {
      // Keep them the same
      nextFocusedId = currentFocusedId;
    }
  }
  setFocusedId({
    nextFocusedId,
    keyCode: keycode('up'),
  });
}

function getNewOptionList(props: {
  optionList: Array<BaseSearchOption>, // all option list, from props
  searchText: string,
}) {
  const {optionList, searchText} = props;
  if (!searchText) {
    return optionList;
  }

  // Only get the options that contain id and name
  return optionList.filter(so => {
    return so.id.includes(searchText) || so.name.includes(searchText);
  });
}

export default {
  handleKeyEscape,
  handleKeyDown,
  handleKeyUp,
  getNewOptionList,
  resultRepositionScroll,
};
export type {SetFocusedIdParams};
