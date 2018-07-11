// @flow
import * as React from 'react';
import Examples from 'this_is_getting_replaced';
import document from 'global/document';
import window from 'global/window';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

window.el = Enzyme.mount(Examples[0], {
  attachTo: document.getElementById('root'),
});
