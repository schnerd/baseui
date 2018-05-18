// @flow
import {styled, withStyle} from 'styletron-react';

import {fontSizes, hexColors, lineHeights} from '../styles';
import type {StyleProps} from '../common';

type Props = {
  style?: StyleProps,
  value?: ?string,
  $isDisabled?: boolean,
};

const BaseInputText = styled('input', (props: Props) => {
  const {style, value, $isDisabled} = props;

  let computedStyle = {};
  if ($isDisabled) {
    computedStyle = {
      backgroundColor: hexColors.gray6,
      color: hexColors.gray30,
      cursor: 'not-allowed',
    };
  } else if (value) {
    computedStyle = {
      backgroundColor: hexColors.white,
      border: `1px solid ${hexColors.primary}`,
    };
  }

  return {
    backgroundColor: hexColors.gray3,
    fontSize: fontSizes.normal,
    lineHeight: lineHeights.small,
    borderRadius: '4px',
    outline: 'none',
    padding: '9px 12px',
    color: hexColors.black,
    transition: 'all 200ms',
    border: '1px solid transparent',
    ':focus': {
      boxShadow: `0 0 4px 0 ${hexColors.primaryTint50}`,
    },
    ...computedStyle,
    ...style,
  };
});

const BaseInputHint = styled('div', (props: Props) => ({
  color: hexColors.gray60,
  fontSize: fontSizes.small,
  lineHeight: lineHeights.small,
  ...props.style,
}));

const BaseInputLabel = styled('div', (props: Props) => ({
  color: hexColors.black,
  fontSize: '14px',
  marginBottom: '8px',
  ...props.style,
}));

const BaseInputTextMinimal = withStyle(BaseInputText, (props: Props) => {
  const {style, value, $isDisabled} = props;

  let computedStyle = {};
  if ($isDisabled) {
    computedStyle = {
      backgroundColor: hexColors.gray6,
      color: hexColors.gray30,
      cursor: 'not-allowed',
    };
  } else if (value) {
    computedStyle = {
      backgroundColor: hexColors.white,
      borderBottom: `1px solid ${hexColors.primary}`,
    };
  }

  return {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid transparent',
    borderRadius: 0,
    padding: 0,
    ':focus': {
      boxShadow: 'none',
    },
    ...computedStyle,
    ...style,
  };
});

const BaseInputTextBorderless = withStyle(
  BaseInputTextMinimal,
  (props: Props) => {
    const {style, value, $isDisabled} = props;

    let computedStyle = {};
    if (!$isDisabled && value) {
      computedStyle = {
        borderBottom: 'none',
      };
    }

    return {
      border: 'none',
      ...computedStyle,
      ...style,
    };
  }
);

export {
  BaseInputLabel,
  BaseInputText,
  BaseInputHint,
  BaseInputTextMinimal,
  BaseInputTextBorderless,
};
