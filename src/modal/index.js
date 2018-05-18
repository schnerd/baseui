// @flow
import {styled} from 'styletron-react';
import BaseModalOverlay, {StyledBaseModalOverlay} from './overlay';
import {boxShadows, hexColors, lineHeights, fontSizes} from '../styles';
import type {StyleProps} from '../common';
import {
  BaseModalButton,
  BaseModalCancelButton,
  BaseModalPositiveButton,
  BaseModalDangerButton,
  BaseModalXCloseButton,
} from './buttons';

const BaseModalContainer = styled('div', (props: {style?: StyleProps}) => {
  const {style} = props;
  return {
    position: 'absolute',
    width: '400px',
    marginBottom: '40px', // For more scrolling if content scrolls
    left: 'calc(50% - 200px)',
    top: '25%',
    borderRadius: '4px',
    backgroundColor: hexColors.white,
    boxShadow: boxShadows.normal,
    ...style,
  };
});

const BaseModalContentContainer = styled(
  'div',
  (props: {style?: StyleProps}) => {
    const {style} = props;
    return {
      padding: '40px 24px 8px 24px',
      ...style,
    };
  }
);

const BaseModalHeadingText = styled('div', (props: {style?: StyleProps}) => {
  const {style} = props;
  return {
    fontSize: fontSizes.large,
    lineHeight: lineHeights.large,
    color: hexColors.black,
    marginBottom: '16px',
    ...style,
  };
});

const BaseModalParagraph = styled('div', (props: {style?: StyleProps}) => {
  const {style} = props;
  return {
    fontSize: fontSizes.normal,
    lineHeight: lineHeights.normal,
    color: hexColors.gray60,
    margin: '0 0 20px 0',
    ...style,
  };
});

const BaseModalButtonContainer = styled(
  'div',
  (props: {style?: StyleProps}) => {
    const {style} = props;
    return {
      display: 'flex',
      justifyContent: 'flex-end',
      ...style,
    };
  }
);

export {
  BaseModalOverlay,
  BaseModalContainer,
  BaseModalContentContainer,
  BaseModalHeadingText,
  BaseModalParagraph,
  BaseModalButtonContainer,
  // Button
  BaseModalButton,
  BaseModalCancelButton,
  BaseModalPositiveButton,
  BaseModalDangerButton,
  BaseModalXCloseButton,
  // This is to be used as "base overlay". One use case is for side navigation bar overlay
  StyledBaseModalOverlay,
};
