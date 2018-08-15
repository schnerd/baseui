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
import * as Utils from '../utils';

describe('Menu Utils - mapStyletronProps', () => {
  test('successfully maps', () => {
    const props = {
      someStyletronProps: 'styletron',
      normalProps: 'normal',
    };
    const mapper = {
      someStyletronProps: true,
    };
    expect(Utils.mapStyletronProps(props, mapper)).toEqual({
      $someStyletronProps: 'styletron',
      normalProps: 'normal',
    });
  });
});

describe('Menu Utils - scrollItemIntoView', () => {
  test('scrolling down', () => {
    const mockNode = {
      current: {
        getBoundingClientRect: jest
          .fn()
          .mockReturnValue({bottom: 100})
          .mockReturnValueOnce({bottom: 0}),
        scrollIntoView: jest.fn(),
      },
    };
    const mockParentNode = {
      current: {
        getBoundingClientRect: jest.fn().mockReturnValue({
          bottom: 50,
          height: 50,
        }),
        scrollHeight: 50,
        scrollTop: 100,
      },
    };

    // First call
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
    });
    expect(mockNode.current.scrollIntoView).not.toHaveBeenCalled();

    // Subsequent calls
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
    });
    expect(mockNode.current.scrollIntoView).toHaveBeenCalledWith(false);

    // Last item
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
      isLast: true,
    });
    expect(mockParentNode.current.scrollTop).toBe(0);
  });

  test('scrolling up', () => {
    const mockNode = {
      current: {
        getBoundingClientRect: jest
          .fn()
          .mockReturnValue({top: 0})
          .mockReturnValueOnce({top: 100}),
        scrollIntoView: jest.fn(),
      },
    };
    const mockParentNode = {
      current: {
        getBoundingClientRect: jest.fn().mockReturnValue({top: 50}),
        scrollTop: 100,
      },
    };

    // First call
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
    });
    expect(mockNode.current.scrollIntoView).not.toHaveBeenCalled();

    // Subsequent calls
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
    });
    expect(mockNode.current.scrollIntoView).toHaveBeenCalled();
    expect(mockNode.current.scrollIntoView.mock.calls[0][0]).toBe(undefined);

    // First item
    Utils.scrollItemIntoView({
      // $FlowFixMe
      node: mockNode,
      // $FlowFixMe
      parentNode: mockParentNode,
      isFirst: true,
    });
    expect(mockParentNode.current.scrollTop).toBe(0);
  });
});
