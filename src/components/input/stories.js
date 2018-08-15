/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
/*global module */
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withStyle} from 'styletron-react';
import {styled} from '../../styles';
import {withReadme} from 'storybook-readme';
//$FlowFixMe
import InputReadme from '../../../rfcs/input-component.md';
import {
  Input as ControlledInput,
  StatefulInput as Input,
  StyledInputContainer,
  SIZE,
} from './index';

const Button = styled('button', ({$theme}) => {
  return {
    ...$theme.typography.font300,
    display: 'block',
    paddingTop: '10px',
    paddingRight: '12px',
    paddingBottom: '10px',
    paddingLeft: '12px',
    marginTop: '8px',
    width: '100%',
    borderRadius: $theme.sizing.scale100,
    borderWidth: 'none',
  };
});

const InputIcon = styled('span', props => {
  return {
    width: '16px',
    display: 'flex',
    alignItems: 'center',
    padding:
      props.$position === 'left'
        ? '0 0 0 12px'
        : props.$position === 'right' ? '0 12px 0 0' : '0',
    ':before': {
      content: '""',
      display: 'inline-block',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: props.$isFocused
        ? props.$theme.colors.primary
        : '#999999',
    },
  };
});

const RootWithStyle = withStyle(StyledInputContainer, props => {
  const {$disabled, $error, $isFocused, $theme: {colors, sizing}} = props;
  return {
    borderColor: $disabled
      ? colors.borderAlt
      : $error
        ? colors.borderError
        : $isFocused ? 'darkseagreen' : colors.border,
    boxShadow: `0 0 ${sizing.scale100} ${
      $disabled
        ? 'transparent'
        : $error
          ? colors.shadowError
          : $isFocused ? 'lightseagreen' : 'transparent'
    }`,
  };
});

const TextHighlight = styled('span', ({$theme}) => {
  return {color: $theme.colors.primary};
});

storiesOf('Input', module)
  .addDecorator(withReadme(InputReadme))
  // .add('Passing dynamic props', () => {
  //   return <MyComponent />;
  // })
  .add('Controlled and uncontrolled input', () => {
    return (
      <React.Fragment>
        <ControlledInput placeholder="Controlled input" />
        <br />
        <Input placeholder="Uncontrolled (stateful) input" />
      </React.Fragment>
    );
  })
  .add('Input size', () => {
    return (
      <React.Fragment>
        <Input placeholder="Default input" />
        <br />
        <Input size={SIZE.compact} placeholder="Compact input" />
      </React.Fragment>
    );
  })
  .add('Input state', () => {
    return (
      <React.Fragment>
        <Input size={SIZE.compact} placeholder="Default input" />
        <br />
        <Input
          initialState={{value: 'uber'}}
          autoFocus
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          placeholder="Initially focused input"
        />
        <br />
        <Input
          size={SIZE.compact}
          error
          placeholder="Input in an error state"
        />
        <br />
        <Input
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          error
          placeholder="Input with enhancers in an error state"
        />
        <br />
        <Input size={SIZE.compact} disabled placeholder="Disabled input" />
        <br />
        <Input
          startEnhancer="@"
          endEnhancer=".com"
          size={SIZE.compact}
          disabled
          placeholder="Disabled input with enhancers"
        />
      </React.Fragment>
    );
  })
  .add('Input enhancers', () => {
    return (
      <React.Fragment>
        <Input startEnhancer="@" placeholder="Input with a startEnhancer" />
        <br />
        <Input endEnhancer=".00" placeholder="Input with an endEnhancer" />
        <br />
        <Input
          startEnhancer="@"
          endEnhancer=".00"
          placeholder="Input with start and end enhancers"
        />
        <br />
        <Input
          startEnhancer={<InputIcon />}
          endEnhancer={<InputIcon />}
          placeholder="Input with element type enhancers"
        />
        <br />
        <Input
          startEnhancer={({$isFocused}) => {
            return $isFocused ? <TextHighlight>@</TextHighlight> : '@';
          }}
          endEnhancer={({$isFocused}) => {
            return $isFocused ? <TextHighlight>.00</TextHighlight> : '.00';
          }}
          placeholder="Input with function type enhancers. Shared props are passed into an enhancer func"
        />
      </React.Fragment>
    );
  })
  .add('Input with Before and After', () => {
    return (
      <React.Fragment>
        <Input
          overrides={{
            Before: function Before(props) {
              return <InputIcon {...props} $position="left" />;
            },
          }}
          placeholder="Input with a Before component"
        />
        <br />
        <Input
          overrides={{
            After: function After(props) {
              return <InputIcon {...props} $position="right" />;
            },
          }}
          placeholder="Input with an After component"
        />
      </React.Fragment>
    );
  })
  .add(
    'Input with a with custom component override, style overrides and extra props passed',
    () => {
      return (
        <React.Fragment>
          <Input
            overrides={{InputContainer: {component: RootWithStyle}}}
            autoFocus
            placeholder="Input with a custom InputContainer override"
          />
          <br />
          <Input
            overrides={{
              Input: {
                props: {'data-test': 'test'},
                style: {color: '#00F'},
              },
            }}
            initialState={{
              value:
                "With a 'data-test' attrs passes to the input and text style override",
            }}
            placeholder="With a 'data-test' attrs passes to the input and text style override"
          />
        </React.Fragment>
      );
    },
  )
  .add('Input with a ref', () => {
    const inputRef: {current: ?React.ElementRef<'input'>} = React.createRef();
    return (
      <React.Fragment>
        <Input inputRef={inputRef} placeholder="With input ref" />
        <Button
          onClick={() => {
            inputRef.current && inputRef.current.focus();
          }}
        >
          Click here to focus input
        </Button>
      </React.Fragment>
    );
  });
