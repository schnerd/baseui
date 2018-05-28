// @flow

import React from 'react';
import {StyledButton} from './styles';

type Props = {
  disabled?: boolean,
  $secondary?: boolean,
  $tertiary?: boolean,
  $minimal?: boolean,
  $compact?: boolean,
  $round?: boolean,
};

export default function Button(props: Props) {
  return <StyledButton {...props} />;
}

Button.defaultProps = {
  disabled: false,
  $secondary: false,
  $tertiary: false,
  $minimal: false,
  $compact: false,
  $round: false,
};
