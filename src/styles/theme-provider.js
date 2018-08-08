// @flow
import * as React from 'react';
import LIGHT_THEME from '../themes/light-theme';

import type {ThemeT} from './types';

export const ThemeContext = React.createContext({
  theme: LIGHT_THEME,
  styled: () => {
    console.log('Please specify a style implementation');
  },
});

const ThemeProvider = (props: {
  theme: ThemeT,
  styled: () => {},
  children: ?React.Node,
}) => {
  const {theme, styled, children} = props;
  return (
    <ThemeContext.Provider value={{theme, styled}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
