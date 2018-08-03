// @flow
import * as React from 'react';
import {createStyled, withStyleDeep} from 'styletron-react-core';
import {driver} from 'styletron-standard';

import {ThemeContext} from './theme-provider';

const getInitialStyle = () => ({});

const wrapper = StyledComponent =>
  function withThemeHOC(props) {
    return (
      <ThemeContext.Consumer>
        {theme => <StyledComponent {...props} $theme={theme} />}
      </ThemeContext.Consumer>
    );
  };

const baseStyled = createStyled({wrapper, getInitialStyle, driver});

// TODO: Need a flow expert to help remove this 'any' type
// eslint-disable-next-line flowtype/no-weak-types
export default function styledWrapper(base, styler, themeName) {
  // Also allow passing deep style overrides via $style prop
  // Ex: <StyledDiv $style={{color: 'red'}} />
  // Issue for supporting this natively in styletron:
  // https://github.com/rtsao/styletron/issues/221
  return withStyleDeep(baseStyled(base, styler), props => {
    const {$style, $theme} = props;

    let style;
    if ($style) {
      if (typeof $style === 'function') {
        style = $style(props);
      } else {
        style = $style;
      }
    }

    const themeOverride = $theme[themeName];
    if (themeOverride) {
      if (typeof themeOverride === 'function') {
        // These should really be deep merges (not shallow)
        style = {
          ...style,
          ...themeOverride(props),
        };
      } else {
        style = {...style, ...themeOverride};
      }
    }

    return style;
  });
}
