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

type Props = {
  handleClick: (evt: MouseEvent) => void,
};

/*
Put this as the FIRST child of your container in which you want to register the click when
click event happens outside this container.

We are using `parentNode` to check, so you know...
 */
class ClickOutsideListener extends Component<Props> {
  el: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);
    (this: any).handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(evt: MouseEvent) {
    const {el} = this;
    if (!el) {
      return;
    }
    const {handleClick} = this.props;
    const containerEl = el.parentNode;
    // $FlowFixMe I don't know why it's EventNode instead of Node???
    if (
      containerEl &&
      containerEl.contains &&
      !containerEl.contains(evt.target)
    ) {
      handleClick(evt);
    }
  }

  render() {
    return <Empty $ref={c => (this.el = c)} />;
  }
}

export default ClickOutsideListener;
