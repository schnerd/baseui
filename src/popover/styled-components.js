// @flow
/* eslint-disable import/prefer-default-export */
import {styled} from '../styles';
import {capitalize, getOppositePosition} from './utils';

const ARROWLESS_POPOVER_MARGIN = '6px';

/**
 * Returns margin styles to add spacing between the popover
 * and its anchor.
 *
 * We may want to make the margin a prop that can be overridden.
 */
function getMargin({$showArrow, $placement}) {
  // No extra margin if we have an arrow too
  if ($showArrow) {
    return null;
  }
  const position = $placement.match(/^[a-z]+/)[0];
  const opposite = getOppositePosition(position);
  if (!opposite) {
    return null;
  }
  const property = `margin${capitalize(opposite)}`;
  return {
    [property]: ARROWLESS_POPOVER_MARGIN,
  };
}

/**
 * Main popover element that displays the popover content
 * and gets positioned next to the anchor.
 */
export const PopoverBody = styled('div', props => {
  const {$positionStyles, theme} = props;

  const styles = {
    position: 'absolute',
    zIndex: 90000,
    top: 0,
    left: 0,
    backgroundColor: theme.colors.background,
    border: '1px solid hsl(0, 0%, 90%)',
    borderRadius: '4px',
    boxShadow: theme.lighting.shadow600,
    ...getMargin(props),
    ...$positionStyles,
  };

  return styles;
});

/**
 * A drop-in component that provides the recommended padding
 * for popovers. Mostly a convenience for users so they don't
 * have to define this themselves.
 */
export const PopoverPadding = styled('div', {
  padding: '12px',
});
