// @flow
import * as React from 'react';
import classnames from 'classnames';
import styles from './Card.css';

type Props = {|
  active?: ?boolean,
  children?: React.Node,
  onMouseEnter?: ({event: SyntheticMouseEvent<HTMLDivElement>}) => void,
  onMouseLeave?: ({event: SyntheticMouseEvent<HTMLDivElement>}) => void,
|};

type State = {|
  hovered: boolean,
|};

export default class Card extends React.Component<Props, State> {
  state: State = {
    hovered: false,
  };

  handleMouseEnter = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const {onMouseEnter} = this.props;
    this.setState(onMouseEnter && (() => onMouseEnter({event})));
  };

  handleMouseLeave = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const {onMouseLeave} = this.props;
    this.setState(onMouseLeave && (() => onMouseLeave({event})));
  };

  render() {
    const {children, active} = this.props;
    const {hovered} = this.state;
    const classes = classnames(styles.card, {
      [styles.hover]: active || (active == null && hovered),
    });

    return (
      <div
        className={classes}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div>{children}</div>
      </div>
    );
  }
}
