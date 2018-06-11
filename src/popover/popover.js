// @flow
/* eslint-disable react/no-find-dom-node */
import * as React from 'react';
import ReactDOM from 'react-dom';
import {document} from 'global';
import Popper from 'popper.js';
import isBrowser from '../utils/is-browser';
import type {
  AnchorProps,
  PopoverProps,
  PopoverPrivateState,
  PopperData,
} from './types';
import {ARROW_PLACEMENT, PLACEMENT, TRIGGER_TYPE} from './constants';
import {toPopperPlacement, fromPopperPlacement} from './utils';

class Popover extends React.Component<PopoverProps, PopoverPrivateState> {
  static defaultProps = {
    arrowPlacement: ARROW_PLACEMENT.center,
    onClick: null,
    onClickOutside: null,
    onMouseEnter: null,
    onMouseEnterDelay: null,
    onMouseLeave: null,
    onMouseLeaveDelay: null,
    onEsc: null,
    placement: PLACEMENT.auto,
    showArrow: false,
    triggerType: TRIGGER_TYPE.click,
  };

  /* eslint-disable react/sort-comp */
  popper: ?Popper;
  onMouseEnterTimer: ?TimeoutID;
  onMouseLeaveTimer: ?TimeoutID;
  anchorRef: ?React.Component<any, any>;
  popperRef: ?React.Component<any, any>;
  arrowRef: ?React.Component<any, any>;
  /* eslint-enable react/sort-comp */

  constructor(props: PopoverProps) {
    super(props);
    /**
     * Yes our "Stateless" popover still has state. This is private state that
     * customers shouldn't have to manage themselves, such as positioning and
     * potentially other internal flags for managing animation states.
     */
    this.state = this.getDefaultState(props);
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.initializePopper();
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

  initializePopper() {
    const {popperData: {placement}} = this.state;
    this.popper = new Popper(
      ReactDOM.findDOMNode(this.anchorRef),
      ReactDOM.findDOMNode(this.popperRef),
      {
        placement: toPopperPlacement(placement),
        modifiers: {
          // Passing the arrow ref will measure the arrow when calculating styles
          arrow: {
            element: this.arrowRef
              ? ReactDOM.findDOMNode(this.arrowRef)
              : undefined,
            enabled: this.props.showArrow,
          },
          // Disable default styling modifier, and use our custom react one instead
          applyStyle: {enabled: false},
          applyReactStyle: {
            enabled: true,
            fn: this.onPopperUpdate,
            order: 900,
          },
        },
      }
    );
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

  onPopperUpdate = (data: PopperData) => {
    this.setState({
      popperData: {
        ...data,
        placement: fromPopperPlacement(data.placement),
      },
    });
    return data;
  };

  getDefaultState(props: PopoverProps) {
    return {
      popperData: {
        offsets: {},
        placement: props.placement,
        styles: {},
      },
    };
  }

  triggerOnMouseLeaveWithDelay() {
    const {onMouseLeaveDelay} = this.props;
    if (onMouseLeaveDelay) {
      this.onMouseLeaveTimer = setTimeout(
        this.triggerOnMouseLeave,
        onMouseLeaveDelay
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
        onMouseEnterDelay
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
    const popper = ReactDOM.findDOMNode(this.popperRef);
    const anchor = ReactDOM.findDOMNode(this.anchorRef);
    // Ignore document click if it came from popover or anchor
    if (!popper || popper === target || popper.contains((target: any))) {
      return;
    }
    if (!anchor || anchor === target || anchor.contains((target: any))) {
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
    if (this.props.triggerType === TRIGGER_TYPE.click) {
      this.removeDomEvents();
    }
  }

  isClickTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.click;
  }

  isHoverTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.hover;
  }

  getAnchorProps() {
    const anchorProps: AnchorProps = {
      // Always attach onClick–it's still useful to toggle via click
      // even if the anchor is hoverable
      onClick: this.onAnchorClick,
      ref: el => {
        this.anchorRef = el;
      },
      // TODO Styletron needs forwardRef support
      $ref: el => {
        this.anchorRef = el;
      },
    };
    if (this.isHoverTrigger()) {
      anchorProps.onMouseEnter = this.onAnchorMouseEnter;
      anchorProps.onMouseLeave = this.onAnchorMouseLeave;
    }
    return anchorProps;
  }

  renderAnchor() {
    const {children} = this.props;
    const anchorProps = this.getAnchorProps();

    if (React.isValidElement(children)) {
      return React.cloneElement((children: any), anchorProps);
    }
    return <span {...anchorProps}>{children}</span>;
  }

  renderPopover() {
    const {showArrow, components: {PopoverBody}, content} = this.props;
    const {popperData: {styles, placement}} = this.state;

    const interactionProps = {};
    if (this.isHoverTrigger()) {
      interactionProps.onMouseEnter = this.onPopoverMouseEnter;
      interactionProps.onMouseLeave = this.onPopoverMouseLeave;
    }

    return (
      <PopoverBody
        $showArrow={showArrow}
        $positionStyles={styles}
        $placement={placement}
        $ref={el => {
          this.popperRef = el;
        }}
        {...interactionProps}
      >
        {typeof content === 'function' ? content({}) : content}
      </PopoverBody>
    );
  }

  render() {
    const rendered = [this.renderAnchor()];
    if (this.props.isOpen) {
      rendered.push(ReactDOM.createPortal(this.renderPopover(), document.body));
    }
    return rendered;
  }
}

export default Popover;
