// @flow
import * as React from 'react';
// Components
import {
  List as StyledList,
  ListItem as StyledListItem,
} from './styled-components';
import {mapStyletronProps} from './utils';
import {getOverride} from '../../helpers/overrides';
// Types
import type {StatelessMenuPropsT} from './types';

export default function Menu({
  items,
  getItemLabel,
  getRequiredItemProps = (item, index) => ({key: String(index)}),
  rootRef = React.createRef(),
  overrides = {},
}: StatelessMenuPropsT) {
  const {List: ListOverride, ListItem: ListItemOverride} = overrides;
  const List = getOverride(ListOverride) || StyledList;
  const ListItem = getOverride(ListItemOverride) || StyledListItem;
  return (
    <List $ref={rootRef}>
      {items.map((item, index) => {
        const requiredProps = getRequiredItemProps(item, index);
        // $FlowFixMe
        const {key, ...itemProps} = mapStyletronProps(requiredProps);
        // Need to be explicit with `key` otherwise eslint throws error?
        return (
          <ListItem key={key} {...itemProps}>
            {getItemLabel(item)}
          </ListItem>
        );
      })}
    </List>
  );
}