// @flow
/* eslint-disable import/prefer-default-export */
import {withStyleDeep} from 'styletron-react';
import {withProps} from '../helpers';

function isOverridesObject(arg) {
  return typeof arg === 'object' && (arg.style || arg.props);
}

export function getComponent(defaults: {}, components: {}, name: string) {
  const passed = components[name];
  let base = defaults[name];
  if (typeof passed === 'function') {
    return passed;
  }
  if (isOverridesObject(passed)) {
    if (passed.style) {
      base = withStyleDeep(base, passed.style);
    }
    if (passed.props) {
      base = withProps(base, passed.props);
    }
  }
  return base;
}
