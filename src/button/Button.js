/* @flow */

import * as React from 'react';
import classnames from 'classnames';
import styles from './Button.css';

type Props = {
  children?: React.Node,
  color?: 'darkGray' | 'darkBlue',
  size?: 'sm' | 'md' | 'lg',
  onClick?: ({event: SyntheticMouseEvent<>}) => void,
  disabled: boolean,
};

export default function Button(props: Props) {
  const {
    children,
    color = 'darkBlue',
    size = 'md',
    onClick,
    disabled = false,
  } = props;

  const classes = classnames(styles.button, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
    [styles[color]]: !disabled,
    [styles.disabled]: disabled,
  });

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={event => onClick && onClick({event})}
    >
      {children}
    </button>
  );
}
