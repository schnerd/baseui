// @flow
import React from 'react';
import {styled} from 'styletron-react';
import {commonUtils} from '../common';
import {spreadBgColorStyles, hexColors, fontSizes} from '../styles';
import type {StyleProps, Renderable} from '../common';

const BaseResultItemListContainer = styled(
  'ul',
  (props: {style?: StyleProps}) => {
    const {style} = props;
    return {
      maxHeight: '200px',
      padding: 0,
      margin: 0,
      overflowY: 'auto',
      backgroundColor: hexColors.white,
      ...style,
    };
  }
);

const BaseResultItemContainer = styled(
  'li',
  (props: {
    style?: StyleProps,
    $isDisabled?: boolean,
    $isSelected?: boolean,
    $isFocused?: boolean,
  }) => {
    const {style, $isDisabled, $isSelected, $isFocused} = props;

    let computedStyle = {};
    if ($isDisabled) {
      computedStyle = {};
    } else {
      computedStyle = {
        ...spreadBgColorStyles.hoverNormal,
      };

      if ($isSelected) {
        computedStyle = {
          ...computedStyle,
          backgroundColor: hexColors.gray20,
        };
      }

      if ($isFocused) {
        computedStyle = {
          ...computedStyle,
          backgroundColor: hexColors.gray6,
        };
      }
    }

    return {
      display: 'block',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: fontSizes.normal,
      ...computedStyle,
      ...style,
    };
  }
);

type BaseSearchOption = {
  id: string,
  name: string,
  itemRenderer?: Renderable<BaseSearchOption>,
  isDisabled?: boolean,
  // You can put any other data in meta
  meta?: ?{[key: string]: any},
};

export type Props = {
  $searchOptions: Array<BaseSearchOption>,
  $selectedSearchOption: ?BaseSearchOption,
  $currentFocusedId: $PropertyType<BaseSearchOption, 'id'>,
  $refItemListContainer: (c: ?HTMLUListElement) => any,
  $onSelectItem: (selectedItem: BaseSearchOption) => void,
  $clearFocusedId: () => void,
};

const BaseSearchResultList = (props: Props) => {
  const {
    $searchOptions: searchOptions = [],
    $selectedSearchOption: selectedSearchOption,
    $currentFocusedId: currentFocusedId,
    $refItemListContainer: refItemListContainer,
    $onSelectItem: onSelectItem,
    $clearFocusedId: clearFocusedId,
  } = props;
  let items = searchOptions.map(so => {
    const {id, name, itemRenderer, isDisabled} = so;
    const isSelected = Boolean(
      selectedSearchOption && selectedSearchOption.id === id
    );
    return (
      <BaseResultItemContainer
        key={id}
        id={id}
        $isSelected={isSelected}
        $isFocused={id === currentFocusedId}
        onClick={() => {
          if (isDisabled) {
            return;
          }
          onSelectItem(so);
        }}
        onMouseOver={clearFocusedId}
      >
        {itemRenderer !== undefined
          ? commonUtils.getRenderedEl(itemRenderer, so)
          : name}
      </BaseResultItemContainer>
    );
  });
  if (items.length === 0) {
    items = (
      <BaseResultItemContainer $isDisabled>
        No result found
      </BaseResultItemContainer>
    );
  }
  return (
    <BaseResultItemListContainer $ref={refItemListContainer}>
      {items}
    </BaseResultItemListContainer>
  );
};

export default BaseSearchResultList;
export {BaseResultItemListContainer, BaseResultItemContainer};
export type {BaseSearchOption};
