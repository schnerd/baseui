import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {BaseButton} from './index';

storiesOf('Button', module).add('demo button', () => (
  <BaseButton onClick={action('clicked')}>Hello Button</BaseButton>
));
