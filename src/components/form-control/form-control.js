/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import * as React from 'react';
import {getOverride, getOverrideProps} from '../../helpers/overrides';
import {STYLETRON_PROP_MAPPER} from './constants';
import {
  Label as StyledLabel,
  Caption as StyledCaption,
  ControlContainer as StyledControlContainer,
} from './styled-components';
import type {FormControlPropsT} from './types';

function mapStyletronProps(props: {}, mapper: {}) {
  return Object.keys(props).reduce((newProps, propName) => {
    const newName = mapper[propName] && `$${propName}`;
    if (newName) {
      newProps[newName] = props[propName];
    }
    return newProps;
  }, {});
}

export default class FormControl extends React.Component<FormControlPropsT> {
  static defaultProps = {
    overrides: {},
    label: null,
    caption: null,
    error: false,
  };

  render() {
    const {
      overrides: {Label: LabelOverride, Caption: CaptionOverride},
      label,
      caption,
      error,
      children,
    } = this.props;

    const onlyChildProps = React.Children.only(children).props;
    const sharedProps = mapStyletronProps(
      onlyChildProps,
      STYLETRON_PROP_MAPPER,
    );
    sharedProps.$error = this.props.error || sharedProps.$error;
    const Label = getOverride(LabelOverride) || StyledLabel;
    const Caption = getOverride(CaptionOverride) || StyledCaption;

    return (
      <React.Fragment>
        {label && (
          <Label
            htmlFor={onlyChildProps.id}
            {...sharedProps}
            {...getOverrideProps(LabelOverride)}
          >
            {typeof label === 'function' ? label(sharedProps) : label}
          </Label>
        )}
        <StyledControlContainer>
          {children}
          {(caption || error) && (
            <Caption {...sharedProps} {...getOverrideProps(CaptionOverride)}>
              {error && typeof error !== 'boolean'
                ? typeof error === 'function' ? error(sharedProps) : error
                : typeof caption === 'function'
                  ? caption(sharedProps)
                  : caption}
            </Caption>
          )}
        </StyledControlContainer>
      </React.Fragment>
    );
  }
}
