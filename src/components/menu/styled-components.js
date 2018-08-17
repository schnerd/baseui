// @flow
import {styled} from '../../styles';

import type {ThemeT} from '../../styles';

type StyledPropsT = {
  $theme: ThemeT,
};

type StyledListItemPropsT = {
  $isHighlighted: boolean,
} & StyledPropsT;

const getSharedListStyle = ($theme: ThemeT) => ({
  position: 'relative',
  margin: 0,
  background: $theme.colors.white,
  borderRadius: $theme.borders.radius300,
  boxShadow: $theme.lighting.shadow600,
});

export const List = styled('ul', ({$theme}: StyledPropsT) => ({
  ...getSharedListStyle($theme),
  padding: $theme.sizing.scale600,
}));

export const ListItem = styled(
  'li',
  ({$theme, $isHighlighted}: StyledListItemPropsT) => ({
    ...$theme.typography.font300,
    position: 'relative',
    display: 'block',
    color: $isHighlighted ? $theme.colors.primary : $theme.colors.black,
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    ':hover': {
      color: $theme.colors.primary400,
    },
    ':not(:last-child)': {
      marginBottom: $theme.sizing.scale600,
    },
  }),
);

export const ListProfile = styled('ul', ({$theme}: StyledPropsT) => ({
  ...getSharedListStyle($theme),
  padding: $theme.sizing.scale800,
}));

export const ListItemProfile = styled('li', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  ':not(:last-child)': {
    marginBottom: '18px',
  },
});

export const ProfileImgContainer = styled('div', {
  width: '60px',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ProfileImg = styled('img', {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
});

export const ProfileLabelsContainer = styled('div', ({$theme}) => ({
  marginLeft: $theme.sizing.scale600,
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
}));

export const ProfileTitle = styled('h6', ({$theme}) => ({
  ...$theme.typography.font450,
  color: $theme.colors.black,
  margin: 0,
}));

export const ProfileSubtitle = styled('p', ({$theme}) => ({
  ...$theme.typography.font300,
  color: $theme.colors.black,
  margin: 0,
}));

export const ProfileBody = styled('p', ({$theme}) => ({
  ...$theme.typography.font200,
  margin: 0,
  color: $theme.colors.mono800,
}));
