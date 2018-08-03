// @flow
import {styled} from '../../styles';
import {ADJOINED, SIZE, ENHANCER_POSITION} from './constants';

function getInputPadding(size, theme) {
  return {
    [SIZE.default]: {
      paddingTop: theme.inputDefaultSizePaddingTop || theme.sizing.scale400,
      paddingRight: theme.inputDefaultSizePaddingRight || theme.sizing.scale500,
      paddingBottom: theme.inputDefaultSizePaddingRight || theme.sizing.scale400,
      paddingLeft: theme.inputDefaultSizePaddingRight || theme.sizing.scale500,
    },
    [SIZE.compact]: {
      paddingTop: theme.inputDefaultSizePaddingRight || theme.sizing.scale200,
      paddingRight: theme.inputDefaultSizePaddingRight || theme.sizing.scale500,
      paddingBottom: theme.inputDefaultSizePaddingRight || theme.sizing.scale200,
      paddingLeft: theme.inputDefaultSizePaddingRight || theme.sizing.scale500,
    },
  }[size];
}

function getBorderRadius(adjoined, theme) {
  const radius = theme.inputBorderRadius || theme.sizing.scale100;
  return {
    [ADJOINED.none]: radius,
    [ADJOINED.left]: `0 ${radius} ${radius} 0`,
    [ADJOINED.right]: `${radius} 0 0 ${radius}`,
    [ADJOINED.both]: '0',
  }[adjoined];
}

function getDecoratorBorderRadius(position, theme) {
  const radius = theme.inputDecoraterBorderRadius || theme.sizing.scale100;
  return {
    [ENHANCER_POSITION.start]: `${radius} 0 0 ${radius}`,
    [ENHANCER_POSITION.end]: `0 ${radius} ${radius} 0`,
  }[position];
}

function getFont(size, theme) {
  return {
    [SIZE.default]: theme.inputDefaultSizeFont || theme.typography.font300,
    [SIZE.compact]: theme.inputCompactSizeFont || theme.typography.font200,
  }[size];
}

export const Root = styled('div', props => {
  const {$size, $theme} = props;
  return {
    ...getFont($size, $theme),
    color: $theme.inputTextColor || $theme.colors.mono1000,
    display: 'flex',
    width: '100%',
  };
});

export const Label = styled('label', props => {
  const {$disabled, $theme} = props;
  return {
    ...($theme.inputLabelFont || $theme.typography.font350),
    fontWeight: 500,
    color: $disabled 
      ? $theme.inputLabelDisabledColor || $theme.colors.mono700 
      : $theme.inputLabelColor || $theme.colors.mono1000,
    display: 'block',
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    marginTop: $theme.inputLabelMarginTop || $theme.sizing.scale300,
    marginRight: $theme.inputLabelMarginRight || '0',
    marginBottom: $theme.inputLabelMarginBottom || $theme.sizing.scale300,
    marginLeft: $theme.inputLabelMarginLeft || '0',
  };
});

export const Caption = styled('div', props => {
  const {$error, $theme} = props;
  return {
    ...($theme.inputCaptionFont || $theme.typography.font200),
    color:
      $error && typeof $error !== 'boolean'
        ? $theme.inputCaptionErrorTextColor || $theme.colors.negative400
        : $theme.inputCaptionTextColor || $theme.colors.mono800,
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    marginTop: $theme.inputCaptionMarginTop || $theme.sizing.scale300,
    marginRight: $theme.inputCaptionMarginRight || '0',
    marginBottom: $theme.inputCaptionMarginBottom || $theme.sizing.scale300,
    marginLeft: $theme.inputCaptionMarginLeft || '0',
  };
});

export const InputEnhancer = styled('div', props => {
  const {$position, $size, $theme} = props;
  return {
    ...getFont($size, $theme),
    color: $theme.inputTextColor || $theme.colors.mono900,
    display: 'flex',
    ...getInputPadding($size, $theme),
    backgroundColor: $theme.inputEnhancerBackgroundColor || $theme.colors.mono400,
    borderRadius: getDecoratorBorderRadius($position, $theme),
  };
});

export const InputContainer = styled('div', props => {
  const {
    $isFocused,
    $adjoined,
    $error,
    $disabled,
    $size,
    $theme
  } = props;
  return {
    ...getFont($size, $theme),
    color: $disabled
      ? $theme.inputDisabledTextColor || $theme.colors.mono600
      : $theme.inputTextColor || $theme.colors.mono1000,
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    backgroundColor: $disabled
      ? $theme.inputDisabledBackgroundColor || $theme.colors.mono300
      : $isFocused || $error
        ? $theme.inputFocusedBackgroundColor || $theme.colors.mono100
        : $theme.inputBackgroundColor || $theme.colors.mono200,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: $disabled
      ? $theme.inputDisabledBorderColor || $theme.colors.mono300
      : $error
        ? $theme.inputErrorBorderColor || $theme.colors.negative400
        : $isFocused
          ? $theme.inputFocusedBorderColor || $theme.colors.primary400
          : $theme.inputBorderColor || $theme.colors.mono200,
    borderRadius: getBorderRadius($adjoined, $theme),
    boxShadow: `0 2px 6px ${
      $disabled
        ? 'transparent'
        : $isFocused
          ? $error
            ? $theme.inputErrorShadow || $theme.colors.shadowError
            : $theme.inputFocusShadow || $theme.colors.shadowFocus
          : 'transparent'
    }`,
    transitionProperty: 'border, boxShadow, backgroundColor',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
  };
});

export const Input = styled('input', props => {
  const {
    $disabled,
    $error,
    $size,
    $theme,
  } = props;
  return {
    ...getFont($size, $theme),
    color: $disabled
      ? $theme.inputDisbaledTextColor || $theme.colors.mono600 
      : $theme.inputTextColor || $theme.colors.mono1000,
    caretColor: $error
      ? $theme.inputErrorCaretColor || $theme.colors.negative400
      : $theme.inputCaretColor || $theme.colors.primary,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    borderWidth: '0',
    borderStyle: 'none',
    outline: 'none',
    ...getInputPadding($size, $theme),
    width: '100%',
    '::placeholder': {
      color: $disabled
        ? $theme.inputPlaceholderDisabledTextColor || $theme.colors.mono600
        : $theme.inputPlaceholderTextColor || $theme.colors.mono700,
    },
    ':hover': {
      cursor: $disabled ? 'not-allowed' : 'text',
    },
  };
});
