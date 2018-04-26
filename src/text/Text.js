// @flow
import * as React from 'react';
import classnames from 'classnames';
import styles from './Text.css';
import typography from '../Typography.css';

type Props = {|
  align?: 'left' | 'right' | 'center' | 'justify',
  size?: 1 | 2 | 3 | 4 | 5,
  bold?: boolean,
  children?: React.Node,
  color?: 'gray' | 'darkBlue',
  italic?: boolean,
  overflow?: 'normal' | 'breakWord',
  truncate?: boolean,
|};

export default function Text({
  align = 'left',
  bold = false,
  children,
  color = 'gray',
  italic = false,
  overflow = 'breakWord',
  size = 3,
  truncate = false,
}: Props) {
  const classes = classnames(
    styles.Text,
    styles[`fontSize${size}`],
    styles[color],
    typography[align],
    italic && typography.fontStyleItalic,
    !italic && typography.fontStyleNormal,
    bold && typography.fontWeightBold,
    !bold && typography.fontWeightNormal,
    truncate && typography.truncate,
    overflow === 'breakWord' && typography.breakWord
  );

  return <span className={classes}>{children}</span>;
}
