// @flow
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import Menu from './menu';
import StatefulContainer from './stateful-container';

import type {StatefulMenuPropsT} from './types';

export default class StatefulMenu extends React.PureComponent<
  StatefulMenuPropsT,
> {
  static defaultProps = {
    overrides: {},
  };

  render() {
    const {overrides, getItemLabel, ...props} = this.props;
    return (
      <StatefulContainer {...props}>
        {renderProps => (
          <Menu
            {...renderProps}
            getItemLabel={getItemLabel}
            overrides={overrides}
          />
        )}
      </StatefulContainer>
    );
  }
}