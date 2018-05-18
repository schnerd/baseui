// @flow
import React, {Component} from 'react';
import {styled} from 'styletron-react';
import document from 'global/document';
import type {StyleProps} from '../common';
import {zIndexes} from '../styles';

// Cannot call `styled` because undefined [1] is not a React component --- I HAVE NO IDEA
// $FlowFixMe
const StyledBaseModalOverlay = styled('div', (props: {style?: StyleProps}) => {
  const {style} = props;
  return {
    transition: 'all 200ms',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: zIndexes.modal,
    overflowY: 'auto',
    ...style,
  };
});

class BaseModalOverlay extends Component<{children: React$Node}> {
  componentDidMount() {
    if (document.body) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (document.body) {
      // $FlowFixMe just stick with `null` for now
      document.body.style.overflow = null;
    }
  }

  render() {
    const {children, ...rest} = this.props;
    return (
      <StyledBaseModalOverlay {...rest}>{children}</StyledBaseModalOverlay>
    );
  }
}

export default BaseModalOverlay;
export {StyledBaseModalOverlay};
