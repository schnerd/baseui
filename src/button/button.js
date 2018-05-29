// @flow

import React from 'react';
import {StyledButton} from './styles';

type Props = {
  $compact?: boolean,
  $kind?: 'primary' | 'secondary' | 'tertiary' | 'minimal',
  $round?: boolean,
  disabled?: boolean,
};

export default function Button(props: Props) {
  return <StyledButton {...props} />;
}

Button.defaultProps = {
  $compact: false,
  $kind: 'primary',
  $round: false,
  disabled: false,
};
