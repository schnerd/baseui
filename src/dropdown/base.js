// @flow
import {styled} from 'styletron-react';
import {fontSizes, hexColors} from '../styles';
import type {StyleProps} from '../common';

const BaseDropdownDisplay = styled('div', (props: {style?: StyleProps}) => {
  const {style} = props;
  return {
    fontSize: fontSizes.normal,
    borderBottom: `1px solid ${hexColors.gray10}`,
    cursor: 'pointer',
    ...style,
  };
});

export {BaseDropdownDisplay};
