// @flow
import * as React from 'react';

export type ComponentObjectOverride = {
  style: {},
  props: {},
};

export type ComponentOverride =
  | React.ComponentType<any>
  | ComponentObjectOverride;
