// @flow
import React from 'react';

import {storiesOf} from '@storybook/react';

import Heading from './Heading';

storiesOf('Heading', module)
  .add('default', () => <Heading>Hello</Heading>)
  .add('smaller Heading', () => <Heading size={2}>Hello</Heading>)
  .add('larger Heading', () => <Heading size={4}>Hello</Heading>)
  .add('Blue heading', () => <Heading color="darkBlue">Hello</Heading>);
