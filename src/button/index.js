// @flow
import {styled, withStyle} from 'styletron-react';
import {fontSizes, hexColors} from '../styles';
import {StyleProps} from '../common';

type Props = {
  style?: StyleProps,
  $isDisabled?: boolean,
  $isLoading?: boolean,
};

const BaseButton = styled('button', (props: Props) => {
  const {$isDisabled, $isLoading, style} = props;

  let statusStyle = {};
  if ($isDisabled || $isLoading) {
    statusStyle = {...statusStyle, opacity: 0.7};
    if ($isDisabled) {
      statusStyle = {...statusStyle, cursor: 'not-allowed'};
    } else if ($isLoading) {
      statusStyle = {...statusStyle, cursor: 'progress'};
    }
  }

  return {
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: fontSizes.normal,
    outline: 'none',
    // borderStyle: 'outset', // Probably we don't need this
    border: 'none',
    ...statusStyle,
    ...style,
  };
});

const BasePrimaryButton = withStyle(BaseButton, (props: Props) => {
  const {style} = props;
  return {
    backgroundColor: hexColors.primary,
    color: hexColors.white,
    ...style,
  };
});

const BaseSecondaryButton = withStyle(BaseButton, (props: Props) => {
  const {style} = props;
  return {
    backgroundColor: hexColors.primaryTint10,
    color: hexColors.primary,
    ...style,
  };
});

const BaseTertiaryButton = withStyle(BaseButton, (props: Props) => {
  const {style} = props;
  return {
    backgroundColor: hexColors.gray3,
    color: hexColors.primary,
    ...style,
  };
});

const BaseMinimalButton = withStyle(BaseButton, (props: Props) => {
  const {style} = props;
  return {
    color: hexColors.primary,
    ':hover': {
      backgroundColor: hexColors.gray3,
    },
    ...style,
  };
});

export {
  BaseButton,
  BasePrimaryButton,
  BaseSecondaryButton,
  BaseTertiaryButton,
  BaseMinimalButton,
};
