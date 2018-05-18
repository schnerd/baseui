// @flow
import React from 'react';
import {styled, withStyle} from 'styletron-react';
import type {StyleProps} from '../common';
import {fontSizes, hexColors, lineHeights, rgbColors} from '../styles';

type BaseModalButtonProps = {
  style?: StyleProps,
  $isSibling?: boolean,
  onClick?: () => void,
};

const BaseModalButton = styled('div', (props: BaseModalButtonProps) => {
  const {style, $isSibling} = props;

  let computedStyle = {};
  if ($isSibling) {
    computedStyle = {marginRight: '8px'};
  }

  return {
    padding: '12px',
    fontSize: fontSizes.normal,
    lineHeight: lineHeights.normal,
    cursor: 'pointer',
    transition: 'all 200ms',
    ':hover': {
      // backgroundColor: 'rgba(229, 229, 229, 0.4)',
      backgroundColor: `rgba(${rgbColors.gray20.rgb.join(',')}, 0.4)`,
    },
    ...computedStyle,
    ...style,
  };
});

const StyledXCloseContainer = styled('div', (props: {style?: StyleProps}) => {
  const {style} = props;
  return {
    width: '24px',
    height: '24px',
    padding: '8px',
    color: hexColors.gray40,
    textAlign: 'center',
    position: 'absolute',
    right: '8px',
    top: '8px',
    cursor: 'pointer',
    borderRadius: '50%',
    ':hover': {
      backgroundColor: 'rgba(229, 229, 229, 0.2)',
    },
    ...style,
  };
});
// TODO replace this `x` with an actual icon or svg?
const BaseModalXCloseButton = (props: Object) => (
  <StyledXCloseContainer {...props}>x</StyledXCloseContainer>
);

const BaseModalCancelButton = withStyle(
  BaseModalButton,
  (props: BaseModalButtonProps) => {
    const {style} = props;
    return {
      color: hexColors.gray40,
      transition: 'all 200ms',
      ...style,
    };
  }
);

const BaseModalPositiveButton = withStyle(
  BaseModalButton,
  (props: BaseModalButtonProps) => {
    const {style} = props;
    return {
      color: hexColors.primary,
      ...style,
    };
  }
);

const BaseModalDangerButton = withStyle(
  BaseModalButton,
  (props: BaseModalButtonProps) => {
    const {style} = props;
    return {
      // color: '#EB3A26',
      color: hexColors.warning,
      ...style,
    };
  }
);

export {
  BaseModalButton,
  BaseModalCancelButton,
  BaseModalPositiveButton,
  BaseModalDangerButton,
  BaseModalXCloseButton,
};
