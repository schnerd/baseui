// @flow
import * as React from 'react';
import classnames from 'classnames';
import colors from '../Colors.css';
import styles from './Heading.css';
import typography from '../Typography.css';

type Props = {|
  size?: 1 | 2 | 3 | 4 | 5 | 6,
  children?: React.Node,
  color?: 'darkGray' | 'darkBlue',
  overflow?: 'normal' | 'breakWord',
  truncate?: boolean,
|};

export default function Heading(props: Props) {
  const {
    size = 3,
    children,
    color = 'darkGray',
    overflow = 'breakWord',
    truncate = false,
  } = props;

  const classes = classnames(
    styles.Heading,
    styles[`fontSize${size}`],
    colors[color],
    overflow === 'breakWord' && typography.breakWord,
    truncate && typography.truncate
  );

  return React.createElement(`h${size}`, {className: classes}, children);
}
