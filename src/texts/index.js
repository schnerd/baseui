// @flow
import {styled} from 'styletron-react';

import {fontSizes, hexColors, lineHeights} from '../styles';
import type {StyleProps} from '../common';

const P = styled('div', (props: StyleProps) => {
  const {style} = props;
  return {
    fontSize: fontSizes.normal,
    lineHeight: lineHeights.normal,
    color: hexColors.black,
    ...style,
  };
});

const SmallP = styled('div', (props: StyleProps) => {
  const {style} = props;
  return {
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    color: hexColors.gray60,
    ...style,
  };
});

const Caption = styled('div', (props: StyleProps) => {
  const {style} = props;
  return {
    fontSize: fontSizes.xSmall,
    lineHeight: lineHeights.xSmall,
    color: hexColors.gray60,
    ...style,
  };
});

export {P, SmallP, Caption};
