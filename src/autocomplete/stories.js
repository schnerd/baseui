// @flow
/* global module */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withStyle} from 'styletron-react';

import Autocomplete from './autocomplete';
import {Root} from './styled-components';

const RootMaxWidth = withStyle(Root, {width: '200px'});

const ITEMS: Array<{label: string}> = [
  {label: 'Item One'},
  {label: 'Item Two'},
  {label: 'Item Three'},
  {label: 'Item Four'},
  {label: 'Item Five'},
  {label: 'Item Six'},
  {label: 'Item Seven'},
  {label: 'Item Eight'},
  {label: 'Item Nine'},
  {label: 'Item Ten'},
  {label: 'Item Eleven'},
  {label: 'Item Twelve'},
];

storiesOf('Autocomplete', module).add('Stateless Autocomplete', () => (
  <Autocomplete
    items={ITEMS}
    getItemLabel={item => item.label}
    isOpen={true}
    components={{
      Root: RootMaxWidth,
    }}
  />
));

// import AutoComplete, {
//   InputComponent,
//   ResultListComponent,
//   ResultComponent,
// } from './autocomplete';
// import DsAutocomplete from './ds-autocomplete';
// // import AutoCompleteWrapper from './wrapper';

// const StyledInput = withStyle(InputComponent, {
//   width: '288px',
//   height: '40px',
//   borderRadius: '4px',
//   fontSize: '14px',
//   lineHeight: '20px',
//   backgroundColor: '#F7F7F7',
//   padding: '10px 12px',
//   border: 'none',
// });

// const StyledResult = withStyle(ResultComponent, {
//   fontFamily: 'Helvetica Neue',
//   fontSize: '14px',
//   lineHeight: '24px',
//   marginBottom: '16px',
//   ':hover': {
//     color: '#1B6DE0',
//   },
// });

// const StyledResultList = withStyle(ResultListComponent, {
//   border: 'none',
//   display: 'flex',
//   flexDirection: 'column',
//   padding: '16px 16px 0',
//   marginTop: '10px',
//   borderRadius: '4px',
//   background: '#FFF',
//   boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.24)',
//   width: '272px',
//   maxHeight: '216px',
//   overflow: 'auto',
// });

// // Going Crazy With Total Overrides

// const ACRoot = styled('div', {
//   position: 'relative',
//   borderRadius: '4px',
//   display: 'flex',
//   width: '1000px',
//   height: '600px',
//   background: '#FFF',
//   boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.24)',
// });

// const ACSection = styled('div', {
//   flex: '1 1 50%',
//   position: 'relative',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// });

// const ACLeft = withStyle(ACSection, {
//   background: '#0D3670',
// });

// const ACRight = withStyle(ACSection, {
//   background: '#4E77B0',
// });

// const ACStyledText = styled('div', {
//   position: 'relative',
//   fontSize: '25px',
//   lineHeight: '30px',
//   letterSpacing: '0.4px',
//   textTransform: 'uppercase',
//   fontFamily: 'PT Sans',
//   background: 'none',
//   color: '#FFF',
// });

// const AutoCompleteOptions = [
//   {label: 'California'},
//   {label: 'Seattle'},
//   {label: 'Oregon'},
//   {label: 'Ohio'},
// ];

// storiesOf('AutoComplete', module)
//   .add('Default', () => <AutoComplete options={AutoCompleteOptions} />)
//   .add('Downshift', () => (
//     <DsAutocomplete
//       items={AutoCompleteOptions}
//       getItemValue={item => item.label}
//       getItemDisplay={item => item.label}
//     />
//   ));
// // .add('Component Injection', () => (
// //   <AutoComplete
// //     options={AutoCompleteOptions}
// //     onChange={action('changed')}
// //     components={{
// //       Input: withProps({placeholder: 'Some placeholder text'})(StyledInput),
// //       Result: StyledResult,
// //       ResultList: StyledResultList,
// //     }}
// //   />
// // ))
// // .add('Children-as-a-Function', () => (
// //   <AutoCompleteWrapper options={AutoCompleteOptions}>
// //     {({query, results, onQueryChange}) => {
// //       const result = results[0];
// //       const promptMe = !query;
// //       const text = promptMe
// //         ? 'Hey, type something!!!'
// //         : result ? result.label : 'Boo, we dont got that, try again';
// //       return (
// //         <ACRoot>
// //           <ACLeft>
// //             <StyledInput
// //               placeholder="Come on, we don't got all day"
// //               type="text"
// //               value={query}
// //               onChange={onQueryChange}
// //             />
// //           </ACLeft>
// //           <ACRight>
// //             <ACStyledText>{text}</ACStyledText>
// //           </ACRight>
// //         </ACRoot>
// //       );
// //     }}
// //   </AutoCompleteWrapper>
// // ));
