import React from 'react';
import {configure, addDecorator, setAddon} from '@storybook/react';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {ThemeProvider} from '../src/styles';
import DEFAULT_THEME from '../src/themes/light-theme';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import styletronStyled from '../src/styles/styletron';
import emotionStyled from '../src/styles/emotion';

const engine = new Styletron();

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// this should be first decorator to avoid extra code to be parsed here
addDecorator(story => {
  return withInfo()(story)({});
});

addDecorator(withKnobs);

// Add providers for theme and styletron
addDecorator(story => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider
        theme={DEFAULT_THEME}
        styled={
          // Both styletronStyled and emotionStyled work here!
          emotionStyled
        }
      >
        {story()}
      </ThemeProvider>
    </StyletronProvider>
  );
});

configure(loadStories, module);
