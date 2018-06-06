// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Popover from './popover';
import type {StatefulPopoverProps} from './types';

export default function StatefulPopover(props: StatefulPopoverProps) {
  const {children, ...restProps} = props;
  return (
    <StatefulContainer {...restProps}>
      {popoverProps => <Popover {...popoverProps}>{children}</Popover>}
    </StatefulContainer>
  );
}
