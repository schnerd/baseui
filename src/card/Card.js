// @flow
import * as React from 'react';
import classnames from 'classnames';
import styles from './Card.css';

type Props = {|
  headline?: React.Node,
  text?: string,
  image?: React.Node,
  thumbnail?: React.Node,
  action?: React.Node,
  onMouseEnter?: ({event: SyntheticMouseEvent<HTMLDivElement>}) => void,
  onMouseLeave?: ({event: SyntheticMouseEvent<HTMLDivElement>}) => void,
  active?: boolean,
|};

type State = {|
  hovered: false,
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
    const {headline, text, image, thumbnail, action, active} = this.props;

    const {hovered} = this.state;

    const classes = classnames(styles.card, {
      [styles.hovered]: active || (active == null && hovered),
    });

    if (thumbnail) {
      return (
        <div className={classes}>
          <div>
            <div>
              {headline}
              {text}
            </div>
            {thumbnail}
          </div>
          {action}
        </div>
      );
    }
    return (
      <div className={classes}>
        {image}
        {headline}
        {text}
        {action}
      </div>
    );
  }
}
