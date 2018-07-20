// @flow
import * as React from 'react';
import {Root as StyledRoot} from './styled-components';
// Use Menulist
import {StyledList, StyledListItem, StatefulMenulist} from '../menulist';
import {BaseInput} from '../input';
// Types
import type {StatelessAutocompletePropsT} from './types';

export default function Autocomplete({
  items,
  getItemLabel,
  getRequiredInputProps = () => ({
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
  }),
  query,
  isOpen,
  components: {
    // $FlowFixMe
    Root = StyledRoot,
    // $FlowFixMe
    Input = BaseInput,
    // $FlowFixMe
    ResultList = StyledList,
    // $FlowFixMe
    Result = StyledListItem,
  },
}: StatelessAutocompletePropsT) {
  return (
    <Root>
      <Input {...getRequiredInputProps()} />
      {isOpen && (
        <StatefulMenulist
          items={items}
          getItemLabel={getItemLabel}
          components={{
            List: ResultList,
            ListItem: Result,
          }}
        />
      )}
    </Root>
  );
}
