// @flow
import {styled} from '../styles';

function getBorderColor(props) {
  const {checked, $error, isIndeterminate, $theme} = props;
  const {colors} = $theme;
  return $error
    ? colors.alert400
    : isIndeterminate || checked ? colors.primary400 : colors.mono700;
}

function getLabelPadding(props) {
  const {placement, $theme} = props;
  const {sizing} = $theme;
  const {scale200} = sizing;
  switch (placement) {
    case 'left':
      return '0 ' + scale200 + ' 0 0';
    case 'top':
      return '0 0 ' + scale200 + ' 0';
    case 'bottom':
      return scale200 + ' 0 0 0';
    case 'right':
    default:
      return '0 0 0 ' + scale200;
  }
}

function getBackgroundColor(props) {
  const {disabled, checked, isIndeterminate, $isFocused, $theme} = props;
  const {colors} = $theme;
  return disabled
    ? colors.mono300
    : isIndeterminate || checked
      ? colors.primary400
      : $isFocused ? colors.mono500 : null;
}

function getLabelColor(props) {
  const {disabled, $error, $theme} = props;
  const {colors} = $theme;
  return disabled ? colors.mono600 : $error ? colors.alert400 : colors.mono1000;
}

export const Root = styled('label', props => {
  const {disabled} = props;
  return {
    display: 'flex',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
});

export const Checkmark = styled('span', props => {
  const {checked, disabled, $isIndeterminate, $theme, $isFocused} = props;
  const {colors, sizing, animation} = $theme;
  return {
    flex: '0 0 auto',
    transition: animation.timing100 + ' ' + animation.easeOutCurve,
    width: sizing.scale600,
    height: sizing.scale600,
    left: '4px',
    top: '4px',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: getBorderColor(props),
    borderRadius: $theme.borders.useRoundedCorners ? '4px' : '0px',
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundImage: $isIndeterminate
      ? 'url(\'data:image/svg+xml;utf8,<svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="-1" x2="11" y2="-1" transform="translate(0 2)" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>\');'
      : checked
        ? 'url(\'data:image/svg+xml;utf8,<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.6 0.200059C11.0418 0.53143 11.1314 1.15823 10.8 1.60006L4.8 9.60006C4.62607 9.83197 4.36005 9.97699 4.07089 9.99754C3.78173 10.0181 3.49788 9.91215 3.29289 9.70717L0.292893 6.70717C-0.0976311 6.31664 -0.0976311 5.68348 0.292893 5.29295C0.683417 4.90243 1.31658 4.90243 1.70711 5.29295L3.89181 7.47765L9.2 0.400059C9.53137 -0.0417689 10.1582 -0.131312 10.6 0.200059Z" fill="white"/></svg>\');'
        : null,
    backgroundColor: getBackgroundColor(props),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    ':hover': {
      backgroundColor: $isFocused
        ? colors.mono500
        : !disabled && !$isIndeterminate && !checked ? colors.mono400 : null,
    },
  };
});

export const Label = styled('div', props => {
  const {placement, $theme} = props;
  const {typography} = $theme;
  return {
    display:
      placement === 'left' || placement === 'right' ? 'inline-block' : 'block',
    verticalAlign: 'middle',
    padding: getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.font400,
    fontWeight: '500',
    lineHeight: '20px',
  };
});
// tricky style for focus event cause display: none doesn't work
export const Input = styled('input', {
  opacity: 0,
  width: 0,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
});
