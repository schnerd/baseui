// @flow
import * as React from 'react';

import {createStyled, withStyleDeep} from 'styletron-react-core';
import {driver, getInitialStyle} from 'styletron-standard';

const wrapper = StyledComponent =>
  function ComponentWrapper(props) {
    return <StyledComponent {...props} />;
  };

const baseStyled = createStyled({wrapper, getInitialStyle, driver});

// Also allow passing deep style overrides via $style prop
// Ex: <StyledDiv $style={{color: 'red'}} />
// Issue for supporting this natively in styletron:
// https://github.com/rtsao/styletron/issues/221
// $FlowFixMe
export default function styled(...args) {
  return withStyleDeep(baseStyled(...args), props => {
    // $FlowFixMe
    const {$style} = props;
    if (typeof $style === 'function') {
      return $style(props);
    }
    return $style;
  });
}
