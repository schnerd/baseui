// @flow
/* eslint-disable import/prefer-default-export */

import {styled, type ThemeT} from '../styles';

type Props = {
  theme: ThemeT,
};

export const StyledButton = styled('button', (props: Props) => {
  const {$compact, $kind, $round, disabled, theme} = props;

  const computedStyle = {
    webkitAppearance: 'none',
    mozAppearance: 'none',
    appearance: 'none',

    boxSizing: 'border-box',
    display: 'inline-block',
    padding: `${theme.sizing.scale200} ${theme.sizing.scale400}`,
    margin: 0,
    minHeight: theme.sizing.scale1000,
    minWidth: theme.sizing.scale1000,

    border: 0,
    borderRadius: theme.sizing.scale100,
    boxShadow: theme.lighting.overlay0,
    cursor: 'pointer',
    ...theme.typography.font400,
    fontWeight: 'bold',
    outline: 0,
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none',
    verticalAlign: 'middle',
  };

  if ($compact) {
    Object.assign(computedStyle, {
      minHeight: theme.sizing.scale800,
      minWidth: theme.sizing.scale800,

      ...theme.typography.font200,
      fontWeight: 'bold',
    });
  }

  switch ($kind) {
    case 'primary': {
      Object.assign(computedStyle, {
        backgroundColor: theme.colors.buttonPrimaryFill,
        color: theme.colors.buttonPrimaryText,

        ':focus': {boxShadow: theme.lighting.overlay400},
        ':hover': {boxShadow: theme.lighting.overlay400},
        ':active': {boxShadow: theme.lighting.overlay600},
      });

      break;
    }

    case 'secondary': {
      Object.assign(computedStyle, {
        backgroundColor: theme.colors.buttonSecondaryFill,
        color: theme.colors.buttonSecondaryText,

        ':focus': {boxShadow: theme.lighting.overlay100},
        ':hover': {boxShadow: theme.lighting.overlay100},
        ':active': {boxShadow: theme.lighting.overlay200},
      });

      break;
    }

    case 'tertiary': {
      Object.assign(computedStyle, {
        backgroundColor: theme.colors.buttonTertiaryFill,
        color: theme.colors.buttonTertiaryText,

        ':focus': {boxShadow: theme.lighting.overlay100},
        ':hover': {boxShadow: theme.lighting.overlay100},
        ':active': {boxShadow: theme.lighting.overlay200},
      });

      break;
    }

    case 'minimal': {
      Object.assign(computedStyle, {
        backgroundColor: theme.colors.buttonMinimalFill,
        color: theme.colors.buttonMinimalText,

        ':focus': {boxShadow: theme.lighting.overlay100},
        ':hover': {boxShadow: theme.lighting.overlay100},
        ':active': {boxShadow: theme.lighting.overlay200},
      });

      break;
    }
  }

  if ($round) {
    Object.assign(computedStyle, {
      borderRadius: theme.sizing.scale4800,
    });
  }

  if (disabled) {
    Object.assign(computedStyle, {
      backgroundColor: theme.colors.buttonDisabledFill,
      color: theme.colors.buttonDisabledText,
      cursor: 'not-allowed',

      ':focus': {},
      ':hover': {},
      ':active': {},
    });
  }

  return computedStyle;
});
