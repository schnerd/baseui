// @flow
import * as React from 'react';

export default class BaseUIComponent<P, S> extends React.Component<P, S> {
  defaultInternals = {};

  renderInternal(
    name: string,
    props: {},
    children: React.ChildrenArray<React.Node>,
  ) {
    const components = this.props.components || {};
    const overrides = components[name] || {};

    const Component = overrides.component || this.defaultInternals[name];

    const newProps = {...props, ...overrides.props};
    if (overrides.styles) {
      newProps.$style = overrides.styles;
    }

    return <Component {...newProps}>{children}</Component>;
  }
}
