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
/* global module */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withStyle} from 'styletron-react';

import Menu from './menu';
import StatefulMenu from './stateful-menu';
import {List} from './styled-components';

// Give a width to render this nicer
const ListMaxWidth = withStyle(List, {width: '200px'});

const ITEMS: Array<{label: string}> = [
  {label: 'Item One'},
  {label: 'Item Two'},
  {label: 'Item Three'},
  {label: 'Item Four'},
  {label: 'Item Five'},
  {label: 'Item Six'},
  {label: 'Item Seven'},
  {label: 'Item Eight'},
  {label: 'Item Nine'},
  {label: 'Item Ten'},
  {label: 'Item Eleven'},
  {label: 'Item Twelve'},
];

storiesOf('Menu', module)
  .add('Stateless', () => (
    <Menu
      items={ITEMS}
      getItemLabel={item => item.label}
      rootRef={React.createRef()}
      overrides={{
        // $FlowFixMe
        List: ListMaxWidth,
      }}
    />
  ))
  .add('Stateful with keybindings', () => (
    <StatefulMenu
      items={ITEMS}
      onItemSelect={action('item select')}
      getItemLabel={item => item.label}
      overrides={{
        // $FlowFixMe
        List: withStyle(ListMaxWidth, {height: '150px', overflow: 'auto'}),
      }}
    />
  ));
