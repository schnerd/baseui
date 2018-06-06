// @flow
/* eslint-disable import/prefer-default-export */
import type {PopoverPlacement} from './types';

/**
 * Converts our placement prop to a Popper.js placement
 * See docs: https://popper.js.org/popper-documentation.html
 * auto, top, right, bottom, left are the same
 * but things like 'rightTop' must be converted to 'right-start'
 */
export function toPopperPlacement(placement: PopoverPlacement): string {
  return placement
    .replace(/(Top|Left)$/, '-start')
    .replace(/(Right|Bottom)$/, '-end');
}

/**
 * Opposite of function above, converts from Popper.js placement
 * to our placement prop
 */
export function fromPopperPlacement(placement: string): PopoverPlacement {
  let popoverPlacement: any = placement
    .replace(/(top|bottom)-start$/, '$1Left')
    .replace(/(top|bottom)-end$/, '$1Right')
    .replace(/(left|right)-start$/, '$1Top')
    .replace(/(left|right)-end$/, '$1Bottom');
  (popoverPlacement: PopoverPlacement);
  return popoverPlacement;
}

const OPPOSITE_POSITIONS = {
  top: 'bottom',
  bottom: 'top',
  right: 'left',
  left: 'right',
};

export function getOppositePosition(position: string): string {
  return OPPOSITE_POSITIONS[position];
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
