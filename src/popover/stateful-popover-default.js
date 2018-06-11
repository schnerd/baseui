// @flow
import StatefulPopover from './stateful-popover';
import {PopoverBody} from './styled-components';
import {hoc} from '../utils/injection-utils';

export default hoc(StatefulPopover, {
  PopoverBody,
});
