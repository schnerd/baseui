// @flow
/* eslint-disable import/prefer-default-export */

import styled from '../styles/styled';

export const StyledButton = styled(
  'button',
  ({disabled, $secondary, $tertiary, $minimal, $compact, $round, theme}) => {
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

      backgroundColor: theme.colors.buttonPrimaryFill,
      border: 0,
      borderRadius: theme.sizing.scale100,
      boxShadow: theme.lighting.overlay0,
      color: theme.colors.buttonPrimaryText,
      cursor: 'pointer',
      ...theme.typography.font400,
      fontWeight: 'bold',
      outline: 0,
      textAlign: 'center',
      textDecoration: 'none',
      userSelect: 'none',
      verticalAlign: 'middle',

      ':focus': {
        boxShadow: theme.lighting.overlay400,
      },

      ':hover': {
        boxShadow: theme.lighting.overlay400,
      },

      ':active': {
        boxShadow: theme.lighting.overlay600,
      },
    };

    if ($compact) {
      Object.assign(computedStyle, {
        minHeight: theme.sizing.scale800,
        minWidth: theme.sizing.scale800,

        ...theme.typography.font200,
        fontWeight: 'bold',
      });
    }

    if ($round) {
      Object.assign(computedStyle, {
        borderRadius: theme.sizing.scale4800,
      });
    }

    if ($secondary) {
      Object.assign(computedStyle, {
        backgroundColor: theme.colors.buttonSecondaryFill,
        color: theme.colors.buttonSecondaryText,
      });
    }

    if ($tertiary) {
      Object.assign(computedStyle, {
        backgroundColor: theme.colors.buttonTertiaryFill,
        color: theme.colors.buttonTertiaryText,
      });
    }

    if ($minimal) {
      Object.assign(computedStyle, {
        backgroundColor: theme.colors.buttonMinimalFill,
        color: theme.colors.buttonMinimalText,
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
  }
);
