// @flow
import {styled, withStyle} from 'styletron-react';

import {fontSizes, lineHeights} from '../styles';
import type {StyleProps} from '../common';

const H = styled('div', (props: {style: StyleProps}) => {
  const {style} = props;
  return {
    letterSpacing: '-2%',
    ...style,
  };
});

const H1 = withStyle(H, (props: {style: StyleProps}) => {
  const {style} = props;
  return {
    fontSize: fontSizes.xxxxLarge,
    lineHeight: lineHeights.xxxxLarge,
    ...style,
  };
});

const H2 = withStyle(H, (props: {style: StyleProps}) => {
  const {style} = props;
  return {
    fontSize: fontSizes.xxxLarge,
    lineHeight: lineHeights.xxxLarge,
    ...style,
  };
});

const H3 = withStyle(H, (props: {style: StyleProps}) => {
  const {style} = props;
  return {
    fontSize: fontSizes.large,
    lineHeight: lineHeights.large,
    ...style,
  };
});

const H4 = withStyle(H, (props: {style: StyleProps}) => {
  const {style} = props;
  return {
    fontSize: fontSizes.medium,
    lineHeight: lineHeights.medium,
    ...style,
  };
});

export {H1, H2, H3, H4};
