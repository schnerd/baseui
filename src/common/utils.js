// @flow
import React from 'react';

function getRenderedEl(
  el: React$Node | Function,
  props: {[key: string]: any} = {}
) {
  if (typeof el === 'function') {
    // It's a function, try to render it
    const El = el;
    return <El {...props} />;
  }
  // It's probably just React node, just return it
  return el;
}

export default {
  getRenderedEl,
};
