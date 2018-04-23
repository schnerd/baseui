// @flow
import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text} from '@storybook/addon-knobs/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import Link from './Link';
import Heading from '../heading/Heading';

const stories = storiesOf('Link', module);
const info = (story, context) => withInfo('common info')(story)(context);

stories.addDecorator(info);
stories.addDecorator(withKnobs);

stories
  .add('Default', () => <Link href="http://localhost:6006/">Default</Link>)
  .add('With Knobs', () => (
    <Link
      href={text('href', 'http://localhost:6006/')}
      onClick={action('clicked')}
    >
      {text('label', 'it is a link')}
    </Link>
  ))
  .add('Heading Link', () => (
    <Heading color="darkBlue">
      <Link href="http://localhost:6006/">Default</Link>
    </Heading>
  ));
