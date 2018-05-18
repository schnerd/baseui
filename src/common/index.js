// @flow
import {styled} from 'styletron-react';
import {hexColors} from '../styles';
import utils from './utils';
import {KeyDownListener, KeyUpListener} from './key-listener';
import ClickOutsideListener from './click-outside-listener';

type StyleProps = {
  [key: string]: mixed,
};
type Renderable<P> = React$Node | ((props: P) => React$Node);

const BaseHorizontalLineSeparator = styled(
  'div',
  (props: {style?: StyleProps}) => {
    const {style} = props;
    return {
      height: '1px',
      // backgroundColor: '#E5E5E5',
      backgroundColor: hexColors.gray20,
      margin: '0 0 8px 0',
      ...style,
    };
  }
);

const BaseVerticalLineSeparator = styled(
  'div',
  (props: {style?: StyleProps}) => {
    /*
  This requires some flex with height 100% container
   */
    const {style} = props;
    return {
      width: '1px',
      backgroundColor: hexColors.gray20,
      height: '100%',
      ...style,
    };
  }
);

export {
  BaseHorizontalLineSeparator,
  BaseVerticalLineSeparator,
  // Listener component
  KeyUpListener,
  KeyDownListener,
  ClickOutsideListener,
  utils as commonUtils,
};

export type {Renderable, StyleProps};
