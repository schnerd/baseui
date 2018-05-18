// @flow
import React, {Component} from 'react';
import {styled} from 'styletron-react';
import document from 'global/document';

const Empty = styled('div', {
  width: 0,
  height: 0,
  opacity: 0,
  visibility: 'hidden',
});

type Props = {|
  targetId: string,
  handleKey: (evt: KeyboardEvent) => any,
  shouldKeyStopPropagation?: boolean,
  onKeyStopPropagation: (evt: KeyboardEvent) => void,
  which: 'keyup' | 'keydown',
|};

class BaseKeyListener extends Component<Props> {
  static defaultProps = {
    shouldKeyStopPropagation: true,
  };

  constructor(props: Props) {
    super(props);
    (this: any).handleGlobalKey = this.handleGlobalKey.bind(this);
  }

  componentDidMount() {
    const {which, targetId} = this.props;
    if (!which) {
      return;
    }
    if (!targetId) {
      document.addEventListener(which, this.handleGlobalKey);
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.addEventListener(which, this.handleGlobalKey);
    }
  }

  componentWillUnmount() {
    const {which, targetId} = this.props;
    if (!which) {
      return;
    }
    if (!targetId) {
      document.removeEventListener(which, this.handleGlobalKey);
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.removeEventListener(which, this.handleGlobalKey);
    }
  }

  handleGlobalKey(evt: KeyboardEvent) {
    const {
      handleKey,
      shouldKeyStopPropagation,
      onKeyStopPropagation,
    } = this.props;
    if (shouldKeyStopPropagation) {
      evt.stopPropagation();
      if (onKeyStopPropagation) {
        onKeyStopPropagation(evt);
      }
    }
    handleKey(evt);
  }

  render() {
    return <Empty />;
  }
}

const KeyUpListener = (props: Props) => {
  return <BaseKeyListener which="keyup" {...props} />;
};
KeyUpListener.defaultProps = {
  shouldKeyStopPropagation: true,
};

const KeyDownListener = (props: Props) => {
  return <BaseKeyListener which="keydown" {...props} />;
};
KeyDownListener.defaultProps = {
  shouldKeyStopPropagation: true,
};

export {KeyUpListener, KeyDownListener};
