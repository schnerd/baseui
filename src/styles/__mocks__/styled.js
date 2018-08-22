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
import React from 'react';
import LIGHT_THEME from '../../themes/light-theme';
import createMockTheme from '../../test/create-mock-theme';
import {mergeDeep} from '../../utils/merge-deep';

type ObjOrFnT = {} | (({}) => {});

type PropsT = {$style?: ObjOrFnT};

const MOCK_THEME = createMockTheme(LIGHT_THEME);

// eslint-disable-next-line react/require-render-return
class AbstractMockStyledComponent extends React.Component<PropsT> {
  static displayName = 'MockStyledComponent';

  getStyleFnArg() {
    return {...this.props, $theme: MOCK_THEME};
  }

  getBaseStyles() {
    throw new Error(
      'Trying to call getBaseStyles on AbstractMockStyledComponent',
    );
  }

  getStyles() {
    let styles = this.getBaseStyles();

    // Check for runtime overrides
    let {$style} = this.props;
    if (typeof $style === 'function') {
      $style = $style(this.getStyleFnArg());
    }
    if ($style) {
      styles = {...styles, ...$style};
    }

    return styles;
  }

  getPassedProps() {
    const {props} = this;
    return Object.keys(props).reduce((acc, key) => {
      if (key[0] !== '$') {
        acc[key] = props[key];
      }
      return acc;
    }, {});
  }

  render() {
    throw new Error('Trying to render AbstractMockStyledComponent');
  }
}

function styled(Base: string, objOrFn?: ObjOrFnT = {}) {
  return class MockStyledComponent extends AbstractMockStyledComponent {
    getBaseStyles() {
      return typeof objOrFn === 'function'
        ? objOrFn(this.getStyleFnArg())
        : objOrFn;
    }

    render() {
      return <Base styled-component="true" {...this.getPassedProps()} />;
    }
  };
}

function withStyle(
  BaseComponent: Class<AbstractMockStyledComponent>,
  objOrFn: ObjOrFnT,
) {
  return class MockStyledComponent extends BaseComponent {
    getBaseStyles() {
      return {
        ...super.getBaseStyles(),
        ...(typeof objOrFn === 'function'
          ? objOrFn(super.getStyleFnArg())
          : objOrFn),
      };
    }
  };
}

function withStyleDeep(
  BaseComponent: Class<AbstractMockStyledComponent>,
  objOrFn: ObjOrFnT,
) {
  return class MockStyledComponent extends BaseComponent {
    getBaseStyles() {
      return mergeDeep(
        {},
        super.getBaseStyles(),
        typeof objOrFn === 'function'
          ? objOrFn(super.getStyleFnArg())
          : objOrFn,
      );
    }
  };
}

export {withStyle, withStyleDeep};

export default styled;
