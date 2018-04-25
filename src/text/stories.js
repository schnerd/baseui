// @overflow

import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, boolean, text, number} from '@storybook/addon-knobs/react';
import {withInfo} from '@storybook/addon-info';
import Text from './Text';

const stories = storiesOf('Text', module);
const info = (story, context) => withInfo('common info')(story)(context);

stories.addDecorator(info);
stories.addDecorator(withKnobs);

stories.add('With Knobs', () => (
  <Text
    align={text('align', 'left')}
    size={number('size', 3)}
    bold={boolean('bold', 'false')}
    color={text('color', 'gray')}
    italic={boolean('italic', false)}
    overflow={text('overflow', 'breakWord')}
    truncate={boolean('truncate', false)}
  >
    I am text, I can be long
  </Text>
));
