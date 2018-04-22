// @flow
import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, number, text, boolean} from '@storybook/addon-knobs/react';
import Heading from './Heading';

const stories = storiesOf('Heading', module);
stories.addDecorator(withKnobs);

stories
  .add('Default', () => <Heading>Default</Heading>)
  .add('With Knobs', () => (
    <Heading
      size={number('size', 2)}
      color={text('color', 'darkGray')}
      overflow={text('overflow', 'breakWord')}
      truncate={boolean('truncate', false)}
    >
      {text('label', 'Heading')}
    </Heading>
  ))
  .add('Smaller', () => <Heading size={number('size', 2)}>Smaller</Heading>)
  .add('larger Heading', () => <Heading size={4}>Hello</Heading>)
  .add('Blue heading', () => <Heading color="darkBlue">Hello</Heading>);
