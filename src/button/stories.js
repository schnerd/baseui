import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs} from '@storybook/addon-knobs/react';
import Button from './Button';
import Heading from '../heading/Heading';

const stories = storiesOf('Button', module);
const info = (story, context) => withInfo('common info')(story)(context);
stories.addDecorator(info);
stories.addDecorator(withKnobs);

stories.add('with Heading', () => (
  <Button onClick={action('clicked')}>
    <Heading size={1} color="white">
      Hello Button
    </Heading>
  </Button>
));
