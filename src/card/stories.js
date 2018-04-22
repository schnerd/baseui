import React from 'react';

import {storiesOf} from '@storybook/react';

import Card from './Card';

storiesOf('Card', module).add('card with header', () => (
  <Card>
    <div>Hello from the Card</div>
  </Card>
));
