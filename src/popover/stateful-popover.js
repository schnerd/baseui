// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Popover from './popover';
import type {StatefulPopoverProps} from './types';

function StatefulPopover(props: StatefulPopoverProps) {
  const {children, ...restProps} = props;
  return (
    <StatefulContainer {...restProps}>
      {popoverProps => <Popover {...popoverProps}>{children}</Popover>}
    </StatefulContainer>
  );
}

StatefulPopover.defaultProps = StatefulContainer.defaultProps;

export default StatefulPopover;
