// @flow
import {styled} from '../styles';

import type {ThemeT} from '../styles';

type StyledPropsT = {
  $theme: ThemeT,
};

export const Root = styled('div', ({$theme}: StyledPropsT) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
}));
