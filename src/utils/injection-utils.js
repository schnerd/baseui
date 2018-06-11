// @flow
/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import {withStyleDeep} from 'styletron-react';
import {withProps} from '../helpers';
import type {ComponentOverrides, ComponentDefaults} from '../types';

function isOverridesObject(arg: any) {
  return typeof arg === 'object' && (arg.style || arg.props);
}

export function getComponent(
  defaults: {},
  // TODO figure out how to refine this properly
  components: any,
  name: string
) {
  const passed = components[name];
  let base = defaults[name];
  if (typeof passed === 'function') {
    return passed;
  } else if (isOverridesObject(passed)) {
    if (passed.style) {
      base = withStyleDeep(base, passed.style);
    }
    if (passed.props) {
      base = withProps(base, passed.props);
    }
  }
  return base;
}

export function hoc(defaults: ComponentDefaults) {
  return (Component: React.ComponentType<any>) => {
    // eslint-disable-next-line react/require-default-props
    return (props: {components?: ComponentOverrides}) => {
      const {components = {}, ...restProps} = props;

      const newComponents = Object.keys(defaults).reduce((acc, id) => {
        acc[id] = getComponent(defaults, components, id);
        return acc;
      }, {});

      return <Component components={newComponents} {...restProps} />;
    };
  };
}
