// @flow
import * as React from 'react';
import classnames from 'classnames';
import styles from './Link.css';

type Props = {|
  children?: React.Node,
  href: string,
  onClick?: ({event: SyntheticMouseEvent<>}) => void,
|};

export default class Link extends React.Component<Props> {
  handleClick = (event: SyntheticMouseEvent<>) => {
    const {onClick} = this.props;
    if (onClick) {
      onClick({event});
    }
  };

  render() {
    const {children, href} = this.props;
    const classes = classnames(styles.link);
    return (
      <a className={classes} href={href} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
