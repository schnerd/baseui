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
import {mount} from 'enzyme';
import FormControl from '../form-control';
import {Label, Caption} from '../styled-components';
import {Input} from '../../input';
import {Textarea} from '../../textarea';
import {Checkbox} from '../../checkbox';
import {RadioGroup, StyledRadio} from '../../radio';

describe('FormControl - Label and Caption for controls', () => {
  test('Renders label, caption, and error for the Input component', () => {
    const rendered = mount(
      <FormControl label="Label test" caption="Caption test">
        <Input />
      </FormControl>,
    );
    const label = rendered.find(Label).first();
    expect(label).toExist();
    expect(label).toHaveText('Label test');
    expect(label.props()).toMatchSnapshot('Label gets correct props');
    const caption = rendered.find(Caption).first();
    expect(caption).toExist();
    expect(caption).toHaveText('Caption test');
    expect(caption.props()).toMatchSnapshot('Caption gets correct props');

    rendered.setProps({
      error: 'Error test',
    });
    expect(caption).toHaveText('Error test');
    expect(caption.props()).toMatchSnapshot(
      'Caption gets correct props when error is passed',
    );
  });

  test('Accepts a node for label, caption, and error', () => {
    const rendered = mount(
      <FormControl
        label={<span>Label test</span>}
        caption={<span>Caption test</span>}
      >
        <Input />
      </FormControl>,
    );
    const label = rendered.find(Label).first();
    expect(label).toHaveText('Label test');
    const caption = rendered.find(Caption).first();
    expect(caption).toHaveText('Caption test');

    rendered.setProps({
      error: <span>Error test</span>,
    });
    expect(caption).toHaveText('Error test');
  });

  test('Accepts a function for label, caption, and error', () => {
    const label = jest.fn().mockReturnValue(<span>Label test</span>);
    const caption = jest.fn().mockReturnValue(<span>Caption test</span>);
    const error = jest.fn().mockReturnValue(<span>Error test</span>);
    const rendered = mount(
      <FormControl label={label} caption={caption}>
        <Input />
      </FormControl>,
    );
    const sharedProps = {
      $disabled: false,
      $error: false,
      $required: false,
      $size: 'default',
    };
    const labelRendered = rendered.find(Label).first();
    expect(label).toHaveBeenCalledWith(sharedProps);
    expect(labelRendered).toHaveText('Label test');
    const captionRendered = rendered.find(Caption).first();
    expect(caption).toHaveBeenCalledWith(sharedProps);
    expect(captionRendered).toHaveText('Caption test');
    expect(error).not.toHaveBeenCalled();

    rendered.setProps({
      error: error,
    });
    expect(error).toHaveBeenCalledWith({
      ...sharedProps,
      $error: error,
    });
    expect(captionRendered).toHaveText('Error test');
  });

  test('Renders caption if error is set on the control', () => {
    const rendered = mount(
      <FormControl label="Label test" caption="Caption test">
        <Input error />
      </FormControl>,
    );
    const caption = rendered.find(Caption).first();
    expect(caption).toHaveText('Caption test');
    expect(caption.props()).toMatchSnapshot(
      'Caption gets correct props if error set on the control',
    );
  });

  test('Passes correct props from the control to label and caption', () => {
    const rendered = mount(
      <FormControl label="Label test" caption="Caption test">
        <Input disabled required error />
      </FormControl>,
    );
    const label = rendered.find(Label).first();
    expect(label.props()).toMatchSnapshot(
      'Label gets correct props from the control',
    );
    const caption = rendered.find(Caption).first();
    expect(caption.props()).toMatchSnapshot(
      'Caption gets correct props from the control',
    );
    rendered.setProps({
      error: 'Error test',
    });
    expect(label.props()).toMatchSnapshot('Label gets correct error value');
    expect(caption.props()).toMatchSnapshot('Caption gets correct error value');
    expect(caption).toHaveText('Error test');
  });

  test('Renders label and caption for the Teaxtarea component', () => {
    const rendered = mount(
      <FormControl label="Label test" caption="Caption test">
        <Textarea required />
      </FormControl>,
    );
    const label = rendered.find(Label).first();
    expect(label).toExist();
    expect(label.props()).toMatchSnapshot('Label gets correct props');
    const caption = rendered.find(Caption).first();
    expect(caption).toExist();
    expect(caption.props()).toMatchSnapshot('Caption gets correct props');
  });
});

test('Renders label and caption for the Checkbox component', () => {
  const rendered = mount(
    <FormControl label="Label test" caption="Caption test">
      <Checkbox required />
    </FormControl>,
  );
  const label = rendered.find(Label).first();
  expect(label).toExist();
  expect(label.props()).toMatchSnapshot('Label gets correct props');
  const caption = rendered.find(Caption).first();
  expect(caption).toExist();
  expect(caption.props()).toMatchSnapshot('Caption gets correct props');
});

test('Renders label and caption for the RadioGroup component', () => {
  const rendered = mount(
    <FormControl label="Label test" caption="Caption test">
      <RadioGroup required>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </RadioGroup>
    </FormControl>,
  );
  const label = rendered.find(Label).first();
  expect(label).toExist();
  expect(label.props()).toMatchSnapshot('Label gets correct props');
  const caption = rendered.find(Caption).first();
  expect(caption).toExist();
  expect(caption.props()).toMatchSnapshot('Caption gets correct props');
});
