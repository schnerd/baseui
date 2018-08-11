// @flow
import {styled} from '../../styles';
import {withStyle} from 'styletron-react';
import {ICON, TYPE} from './constants';
import {StyledListItem, StyledList} from '../menu';

import {StyledInputContainer, StyledInput, SIZE} from '../input';
import {getInputStyles} from '../input/styled-components';

export const Root = styled('div', props => {
  return {
    position: 'relative',
  };
});

export const Input = withStyle(StyledInput, props => {
  return {
    cursor: 'pointer',
    width: 'auto',
    flexGrow: '1',
    ':hover': {
      cursor: 'pointer',
    },
  };
});

export const InputContainer = withStyle(StyledInputContainer, props => {
  const {$theme} = props;
  const {colors: {primary400}} = $theme;
  return {
    flexWrap: 'wrap',
    padding: '5px',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    borderColor: primary400,
  };
});

export const Tag = styled('span', props => {
  const {$theme, $multiple} = props;
  const {colors: {primary400, mono400}, sizing: {scale800}} = $theme;
  return $multiple
    ? {
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        margin: '5px',
        borderWidth: '1px',
        borderColor: primary400,
        color: primary400,
        borderRadius: '7px',
        lineHeight: scale800,
        backgroundColor: mono400,
      }
    : {
        ...getInputStyles({...props, $size: SIZE.default, $disabled: true}),
        cursor: 'pointer',
        width: 'auto',
        flexGrow: '1',
        ':hover': {
          cursor: 'pointer',
        },
      };
});

export const SearchIcon = styled('img', props => {
  const {$theme} = props;
  const {sizing: {scale300, scale400, scale500}} = $theme;
  switch (props.$type) {
    case ICON.CLEAR_ALL:
      return {
        marginLeft: 'auto',
        position: 'absolute',
        right: scale400,
      };
    case ICON.SELECT:
      return {
        marginRight: scale500,
      };
    case ICON.SELECTED:
      return {
        paddingRight: scale300,
      };
    case ICON.CLEAR_TAG:
    case ICON.LOOP:
    default:
      return {};
  }
});

export const DropDown = withStyle(StyledList, props => {
  const {$theme, $isOpen, $type, $rows} = props;
  const {sizing: {scale300, scale600, scale1000}} = $theme;
  return {
    height: $rows ? parseInt(scale600) * $rows + 'px' : null,
    overflowY: $rows ? 'scroll' : null,
    top: $type === TYPE.SELECT ? scale1000 : null,
    display: !$isOpen ? 'none' : null,
    width: '96%',
    position: 'absolute',
    padding: scale600,
    listStyle: 'none',
    borderRadius: scale300,
    boxShadow: $theme.lighting.shadow600,
  };
});

export const DropDownItem = withStyle(StyledListItem, props => {
  const {$theme} = props;
  const {sizing: {scale600}} = $theme;
  return {
    lineHeight: scale600,
  };
});

export const Option = styled('div', props => {
  const {$selected, disabled, $theme} = props;
  const {colors: {mono700, primary400}, sizing: {scale300}} = $theme;
  const padding = $selected
    ? {
        paddingTop: scale300,
        paddingBottom: scale300,
        paddingRight: '0px',
        paddingLeft: '0px',
      }
    : {
        paddingTop: scale300,
        paddingBottom: scale300,
        paddingRight: '18px',
        paddingLeft: '18px',
      };
  return {
    ':hover': {
      cursor: disabled ? 'not-allowed' : 'text',
    },
    color: disabled ? mono700 : $selected ? primary400 : null,
    ...padding,
  };
});
