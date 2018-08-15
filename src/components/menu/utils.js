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
/* eslint-disable import/prefer-default-export */
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

/**
 * Given a props object and a mapper dictionary of prop keys, we will prepend
 * all of the existing prop keys inside mapper with $ to present styletron
 * from passing through those props to the underlying React component.
 */
export function mapStyletronProps(props: {}, mapper: {}): {} {
  return Object.keys(props).reduce((newProps, propName) => {
    const newName = mapper[propName] ? `$${propName}` : propName;
    newProps[newName] = props[propName];
    return newProps;
  }, {});
}

/**
 * Helps scroll a list item into view when cycling through list via
 * keybindings and highlighted item is not in view.
 */
export function scrollItemIntoView({
  node,
  parentNode,
  isFirst,
  isLast,
}: {
  node: React$ElementRef<*>,
  parentNode: React$ElementRef<*>,
  isFirst?: boolean,
  isLast?: boolean,
}) {
  const nodeDOM = node.current;
  const parentNodeDOM = parentNode.current;
  const nodeRect = nodeDOM.getBoundingClientRect();
  const parentNodeRect = parentNodeDOM.getBoundingClientRect();
  // while scrolling down, if element is below view
  if (nodeRect.bottom > parentNodeRect.bottom) {
    if (isLast) {
      parentNodeDOM.scrollTop =
        parentNodeDOM.scrollHeight - parentNodeRect.height;
    } else {
      nodeDOM.scrollIntoView(false);
    }
    // while scrolling up, if element is above view
  } else if (nodeRect.top < parentNodeRect.top) {
    if (isFirst) {
      parentNodeDOM.scrollTop = 0;
    } else {
      nodeDOM.scrollIntoView();
    }
  }
}
