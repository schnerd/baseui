// @flow
/* eslint-disable import/prefer-default-export */
import * as React from 'react';

export function withProps(Component: React.ComponentType<*>, customProps: {}) {
  return (props: {}) => <Component {...customProps} {...props} />;
}
/* eslint-enable import/prefer-default-export */

/**
 * Wrapper
 */
export function renderInternal(
  instance: React.Component<*, *>,
  name: string,
  props: {},
  children: React.ChildrenArray<React.Node>,
) {
  const components = instance.props.components || {};
  const overrides = components[name] || {};

  const Component = overrides.component || instance.defaultInternals[name];

  const newProps = {...props, ...overrides.props};
  if (overrides.styles) {
    newProps.$style = overrides.styles;
  }

  return <Component {...newProps}>{children}</Component>;
}
