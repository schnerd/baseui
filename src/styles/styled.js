// @flow
import * as React from 'react';

import {ThemeContext} from './theme-provider';

export default function styledWrapper(...args: any) {
  let StyledComponent;
  return function Wrapper(props) {
    return (
      <ThemeContext.Consumer>
        {({theme, styled}) => {
          // Lazily instantiate the component using 'styled' from theme
          if (!StyledComponent) {
            StyledComponent = styled(...args);
          }
          return <StyledComponent {...props} $theme={theme} />;
        }}
      </ThemeContext.Consumer>
    );
  };
}
