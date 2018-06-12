# Popover Component

### Exports

* `StatefulPopover`
* `Popover`
* `StatefulContainer`
* `StyledPopover`
* `StyledArrow`

### `StatefulContainer` API

* `initialState: {isOpen: boolean}`
  Initial state of an uncontrolled popover component.
  * `isOpen` - an initial isOpen state
* `stateReducer: (type: open|close, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `changes` - a new state changes that will be set
  * `currentState` - current full state of the component
* `onOpen: () => {}`:
  event handler when popover is shown
* `onClose: () => {}`:
  event handler when popover is hidden
* `placement: 'auto' | 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomRight' | 'bottom' | 'bottomLeft' | 'leftTop' | 'left' | 'leftBottom'`:
  How to position the popover relative to the target. Defaults to 'auto'.
* `arrowPlacement: 'start' | 'center' | 'end'`:
  How to align the arrow on the target element. Defaults to 'center'.
* `content: node | func`:
  Content to render within the popover when it's shown. Required.
* `children: node`:
  Content that should trigger the popover to be shown (also acts as the anchor against which the popover will be positioned)
* `onMouseEnterDelay: number`:
  Number of milliseconds to wait before showing the popover after mousing enters the trigger elment. Defaults to 0.
* `onMouseLeaveDelay: number`:
  Number of milliseconds to wait before hiding the popover after the mouse leaves the trigger element. Defaults to 0.
* `showArrow: boolean`:
  Whether or not to show the arrow pointing from the popover to the trigger. Defaults to false.
* `dismissOnClickOutside: boolean`:
  Whether to hide the popover when the user clicks anywhere outside the trigger/popover. Defaults to true.
* `dismissOnEsc: boolean`:
  Whether to hide the popover when the user presses the escape key. Defaults to true.
* `triggerType: 'click' | 'hover'`:
  Whether to toggle the popover when trigger is clicked or hovered. Defaults to 'click'.

### `Popover` API

* `isOpen: boolean`:
  Whether or not to show the popover
* `placement: 'auto' | 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomRight' | 'bottom' | 'bottomLeft' | 'leftTop' | 'left' | 'leftBottom'`:
  How to position the popover relative to the target. Defaults to 'auto'.
* `arrowPlacement: 'start' | 'center' | 'end'`:
  How to align the arrow on the target element. Defaults to 'center'.
* `content: node | func`:
  Content to render within the popover when it's shown. Required.
* `children: node`:
  Content that should trigger the popover to be shown (also acts as the anchor against which the popover will be positioned)
* `showArrow: boolean`:
  Whether or not to show the arrow pointing from the popover to the trigger. Defaults to false.
* `onClick: func`:
  handler for events on trigger element
* `onMouseEnter: func`:
  handler for events on trigger element
* `onMouseLeave: func`:
  handler for events on trigger element
* `onClickOutside: func`:
  handler for clicks outside the anchor/popover elements
* `onEsc: func`:
  handler for 'Escape' keypress events

### Presentational components props API

##### `PopoverBody`

* `$positionStyles`: Positions the popover body, usually a `transform` style (these styles come from popper.js library)
* `$showArrow`: Whether or not an arrow is shown on the popover pointing to the anchor
* `$placement`: Runtime placement (may differ from placement prop if popover would have overflowed viewport)
* `$ref`: React ref for the popover element (should be passed down to dom element)

##### `PopoverPadding`

No props

### Usage

```js
import {StatefulPopover as Popover, StyledPopoverBody} from './index';
import {withStyle} from '../helpers';

const CustomPopoverBody = withStyle(StyledPopoverBody, {
  borderColor: 'red',
});

export default () => {
  const popoverContent = <div>Hello world</div>;
  return (
    <div>
      <Popover
        placement="topLeft"
        content={popoverContent}
        components={{
          PopoverBody: CustomPopoverBody,
        }}
      >
        <span>Hover me!</span>
      </Popover>
    </div>
  );
};
```

### Implementation Details

#### Dependencies

* popper.js - Handles all the logic around positioning, detecting overflow, arrow placement, etc.

#### Adding handlers to the trigger

In order to trigger the popover the user has to click (or hover) on a trigger element. There are a couple strategies to set up these event handlers that have varying trade-offs:

1.  **Wrapper** - We add a wrapper `<div>` or `<span>` around the passed in trigger element(s) and attach the necessary events. This gives us full control of events, but what's a good default `display` property? People might want their trigger to be display block, inline, or as a flex child, so we'd have to provide a prop or style override to control this.
2.  **cloneElement** - Internally we call React.cloneElement on the `children` that the user passes in, and attach `onClick`, `onFocus`, etc event handlers. This avoids adding a wrapper DOM element but has other downside – (1) can't pass a string as child, (2) child passed in must accept arbitrary props, which is fine for DOM primitives but might get tricky when passing another component as the trigger.
3.  **Child-as-function** - Instead of passing react elements through children, we could have users pass a function instead. This function would receive a props object with event handlers like `onClick`, `onFocus`, etc that they need to explicitly wire up (simplest case is spread into component props).

All the various libraries (atlaskit, antd, material etc) have different approaches here, so there's not really an accepted best practice.

The design in this RFC is based on #2 (`cloneElement`) as it seems like the solution that Just Works® the most. There may also be room for a hybrid approach – such as only adding a wrapper element if the user passes a string as the child. Thoughts are welcome here.

#### Portals

For reiable rendering we need to append the popover to the body (instead of in the DOM where the popover is rendered). We will use [React 16's portals](https://reactjs.org/docs/portals.html) for this.

#### Manually triggering close event

Imagine a simple "Share" popover:

```
  <StatefulPopover
    content={
      <div>
        <ShareUrl/><Button onClick={onCopy}>Copy</Button>
      </div>
    }
  >
    <Button>Share</Button>
  </StatefulPopover>
```

Let's say we want the popover to close after the user clicks "Copy". In theory we could use the non-stateful `<Popover>` component and manage the state oursevles, passing the `isOpen` prop accordingly. However this complicates things signicantly for the user – they may have to handle keyboard controls, on-click-outside, esc, etc on their own to properly set the `isOpen` prop.

A better approach is probably to accept `content` as a render prop that receives a `close` method:

```
  <StatefulPopover
    content={({close}) => (
      <div>
        <ShareUrl/>
        <Button onClick={() => { onCopy(); close(); }}>Copy</Button>
      </div>
    )}
  >
    <Button>Share</Button>
  </StatefulPopover>
```

We could also support a component injection API, where the component you inject is explicitly passed a `close` prop:

```
const PopoverContent = ({close}) => (
  <Button onClick={close}>Close</Button>
);

export default () => (
  <StatefulPopover components={{Content: PopoverContent}}>
    <Button>Share</Button>
  </StatefulPopover>
)
```

However it honestly seems like the render prop approach is a better API in this case.

#### Default styles

The popover element will have zero padding by default. There are many valid use cases for both padded and non-padded popovers, so I'd argue that starting with zero padding and also exporting an optional `StyledPopoverPadding` is a better solution than forcing users to use a style override API to reset padding to zero.

When used as a tooltip, it will have padding by default.

### Accessibility

* We will add keyboard events to make sure it can be interacted without the mouse.
* Ideally the trigger element also has a good focus state / style.
* Need to do a bit more research into what the best practice is here for tooltips/popovers.