// @flow
import Popover from './popover';
import {PopoverBody} from './styled-components';
import {hoc} from '../utils/injection-utils';

export default hoc(Popover, {
  PopoverBody,
});
