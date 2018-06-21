// @flow
/* eslint-disable react/no-find-dom-node */
import * as React from 'react';
import ReactDOM from 'react-dom';
import {document} from 'global';
import Popper from 'popper.js';
import isBrowser from '../utils/is-browser';
import {PLACEMENT, TRIGGER_TYPE} from './constants';
import {
  PopoverArrow as StyledPopoverArrow,
  PopoverBody as StyledPopoverBody,
  PopoverInner as StyledPopoverInner,
} from './styled-components';
import {
  toPopperPlacement,
  fromPopperPlacement,
  prepareArrowPositionStyles,
  preparePopoverPositionStyles,
} from './utils';

import type {
  AnchorProps,
  PopoverProps,
  PopoverPrivateState,
  PopperDataObject,
  ChildType,
} from './types';

class Popover extends React.PureComponent<PopoverProps, PopoverPrivateState> {
  static defaultProps = {
    components: {},
    onMouseLeaveDelay: 200,
    placement: PLACEMENT.auto,
    showArrow: false,
    triggerType: TRIGGER_TYPE.click,
  };

  /* eslint-disable react/sort-comp */
  popper: ?Popper;
  onMouseEnterTimer: ?TimeoutID;
  onMouseLeaveTimer: ?TimeoutID;
  anchorRef = React.createRef();
  popperRef = React.createRef();
  arrowRef = React.createRef();
  /* eslint-enable react/sort-comp */

  /**
   * Yes our "Stateless" popover still has state. This is private state that
   * customers shouldn't have to manage themselves, such as positioning and
   * other internal flags for managing animation states.
   */
  state = this.getDefaultState(this.props);

  componentDidMount() {
    if (this.props.isOpen) {
      this.initializePopper();
      this.addDomEvents();
    }
  }

  componentDidUpdate(prevProps: PopoverProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      if (this.props.isOpen) {
        // Opening
        this.initializePopper();
        this.addDomEvents();
      } else {
        // Closing
        this.destroyPopover();
        this.removeDomEvents();
        setTimeout(this.animateOut, 20);
      }
    }
  }

  componentWillUnmount() {
    this.destroyPopover();
    this.removeDomEvents();
    if (this.onMouseLeaveTimer) {
      clearTimeout(this.onMouseLeaveTimer);
    }
    if (this.onMouseEnterTimer) {
      clearTimeout(this.onMouseEnterTimer);
    }
  }

  animateIn = () => {
    if (this.props.isOpen) {
      this.setState({isAnimating: true});
    }
  };

  animateOut = () => {
    if (!this.props.isOpen) {
      this.setState({isAnimating: true});
      setTimeout(() => {
        this.setState({isAnimating: false});
      }, 500);
    }
  };

  initializePopper() {
    const {placement} = this.state;
    this.popper = new Popper(this.anchorRef.current, this.popperRef.current, {
      // Recommended placement (popper may ignore if it causes a viewport overflow, etc)
      placement: toPopperPlacement(placement),
      modifiers: {
        // Passing the arrow ref will measure the arrow when calculating styles
        arrow: {
          element: this.arrowRef.current,
          enabled: this.props.showArrow,
        },
        computeStyle: {
          // Make popper use top/left instead of transform translate, this is because
          // we use transform for animations and we dont want them to conflict
          gpuAcceleration: false,
        },
        applyStyle: {
          // Disable default styling modifier, we'll apply styles on our own
          enabled: false,
        },
        applyReactStyle: {
          enabled: true,
          fn: this.onPopperUpdate,
          order: 900,
        },
      },
    });
  }

  onAnchorClick = (e: Event) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  onAnchorMouseEnter = () => {
    // First clear any existing close timers, this ensures that the user can
    // move their mouse from the popover back to anchor without it hiding
    if (this.onMouseLeaveTimer) {
      clearTimeout(this.onMouseLeaveTimer);
    }

    this.triggerOnMouseEnterWithDelay();
  };

  onAnchorMouseLeave = () => {
    this.triggerOnMouseLeaveWithDelay();
  };

  onPopoverMouseEnter = () => {
    if (this.onMouseLeaveTimer) {
      clearTimeout(this.onMouseLeaveTimer);
    }
  };

  onPopoverMouseLeave = () => {
    this.triggerOnMouseLeaveWithDelay();
  };

  onKeyPress = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && this.props.onEsc) {
      this.props.onEsc();
    }
  };

  onPopperUpdate = (data: PopperDataObject) => {
    const placement = fromPopperPlacement(data.placement);
    this.setState({
      arrowStyles: prepareArrowPositionStyles(data.arrowStyles, placement),
      positionStyles: preparePopoverPositionStyles(data.styles),
      placement,
    });

    // Now that element has been positioned, we can animate it in
    setTimeout(this.animateIn, 20);

    return data;
  };

  getDefaultState(props: PopoverProps) {
    return {
      isAnimating: false,
      arrowStyles: {left: '0px', top: '0px'},
      positionStyles: {left: '0px', top: '0px'},
      placement: props.placement,
    };
  }

  triggerOnMouseLeaveWithDelay() {
    const {onMouseLeaveDelay} = this.props;
    if (onMouseLeaveDelay) {
      this.onMouseLeaveTimer = setTimeout(
        this.triggerOnMouseLeave,
        onMouseLeaveDelay,
      );
      return;
    }
    this.triggerOnMouseLeave();
  }

  triggerOnMouseLeave = () => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  triggerOnMouseEnterWithDelay() {
    const {onMouseEnterDelay} = this.props;
    if (onMouseEnterDelay) {
      this.onMouseEnterTimer = setTimeout(
        this.triggerOnMouseEnter,
        onMouseEnterDelay,
      );
      return;
    }
    this.triggerOnMouseEnter();
  }

  triggerOnMouseEnter = () => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  addDomEvents() {
    if (!isBrowser) {
      return;
    }
    document.addEventListener('mousedown', this.onDocumentClick);
    document.addEventListener('keyup', this.onKeyPress);
  }

  removeDomEvents() {
    if (!isBrowser) {
      return;
    }
    document.removeEventListener('mousedown', this.onDocumentClick);
    document.removeEventListener('keyup', this.onKeyPress);
  }

  onDocumentClick = (evt: MouseEvent) => {
    const target = evt.target;
    const popper = this.popperRef.current;
    const anchor = this.anchorRef.current;
    // Ignore document click if it came from popover or anchor
    if (!popper || popper === target || popper.contains(target)) {
      return;
    }
    if (!anchor || anchor === target || anchor.contains(target)) {
      return;
    }
    if (this.props.onClickOutside) {
      this.props.onClickOutside();
    }
  };

  destroyPopover() {
    if (this.popper) {
      this.popper.destroy();
      delete this.popper;
    }
    if (this.isClickTrigger()) {
      this.removeDomEvents();
    }
  }

  isClickTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.click;
  }

  isHoverTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.hover;
  }

  getAnchorProps(isDomElement: boolean) {
    const anchorProps: AnchorProps = {
      key: 'popover-anchor',
      // Always attach onClick–it's still useful to toggle via click
      // even if the anchor is hoverable
      onClick: this.onAnchorClick,
    };

    if (isDomElement) {
      anchorProps.ref = this.anchorRef;
    } else {
      // TODO Styletron needs forwardRef support
      // https://github.com/rtsao/styletron/issues/253
      anchorProps.$ref = this.anchorRef;
    }

    if (this.isHoverTrigger()) {
      anchorProps.onMouseEnter = this.onAnchorMouseEnter;
      anchorProps.onMouseLeave = this.onAnchorMouseLeave;
    }
    return anchorProps;
  }

  getAnchorFromChildren() {
    const {children} = this.props;
    const childArray: Array<ChildType> = React.Children.toArray(children);
    if (childArray.length !== 1) {
      // eslint-disable-next-line no-console
      console.error(
        `[baseui] Exactly 1 child must be passed to Popover/Tooltip, found ${
          childArray.length
        } children`,
      );
    }
    return childArray[0];
  }

  renderAnchor() {
    const anchor = this.getAnchorFromChildren();
    const isDomElement = Boolean(
      anchor && typeof anchor === 'object' && typeof anchor.type === 'string',
    );

    const anchorProps = this.getAnchorProps(isDomElement);

    if (anchor && typeof anchor === 'object' && React.isValidElement(anchor)) {
      return React.cloneElement(anchor, anchorProps);
    }
    return <span {...anchorProps}>{anchor}</span>;
  }

  renderPopover() {
    const {isOpen, showArrow, components = {}, content} = this.props;
    const {isAnimating, arrowStyles, positionStyles, placement} = this.state;
    const {
      PopoverArrow = StyledPopoverArrow,
      PopoverBody = StyledPopoverBody,
      PopoverInner = StyledPopoverInner,
    } = components;

    const interactionProps = {};
    if (this.isHoverTrigger()) {
      interactionProps.onMouseEnter = this.onPopoverMouseEnter;
      interactionProps.onMouseLeave = this.onPopoverMouseLeave;
    }

    const sharedProps = {
      $showArrow: showArrow,
      $arrowStyles: arrowStyles,
      $positionStyles: positionStyles,
      $placement: placement,
      $isAnimating: isAnimating,
      $isOpen: isOpen,
    };

    return (
      <PopoverBody
        key="popover-body"
        $ref={this.popperRef}
        {...sharedProps}
        {...interactionProps}
      >
        {showArrow ? (
          <PopoverArrow
            key="popover-arrow"
            $ref={this.arrowRef}
            {...sharedProps}
          />
        ) : null}
        <PopoverInner key="popover-inner">
          {typeof content === 'function' ? content({}) : content}
        </PopoverInner>
      </PopoverBody>
    );
  }

  render() {
    const rendered = [this.renderAnchor()];
    if (isBrowser && (this.props.isOpen || this.state.isAnimating)) {
      rendered.push(ReactDOM.createPortal(this.renderPopover(), document.body));
    }
    return rendered;
  }
}

export default Popover;
