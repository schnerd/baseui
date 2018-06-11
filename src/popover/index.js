import {hoc} from '../utils/injection-utils';
import {PopoverBody, PopoverPadding} from './styled-components';
import StatefulPopoverBase from './stateful-popover';
import StatefulContainer from './stateful-container';
import StatelessPopoverBase from './popover';

// Bind to default component implementations (and support overrides)
const withDefaults = hoc({PopoverBody});
const StatelessPopover = withDefaults(StatelessPopoverBase);
const StatefulPopover = withDefaults(StatefulPopoverBase);

// Components
export {
  StatelessPopover,
  StatelessPopoverBase,
  StatefulContainer as StatefulPopoverContainer,
  StatefulPopover as Popover,
  StatefulPopoverBase as PopoverBase,
};

// Constants
export {PLACEMENT} from './constants';

// Styled elements
export {
  PopoverBody as StyledPopoverBody,
  PopoverPadding as StyledPopoverPadding,
};
