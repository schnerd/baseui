// @flow
import * as React from 'react';

export type ComponentObjectOverride = {
  style: {},
  props: {},
};

export type ComponentOverride =
  | React.ComponentType<any>
  | ComponentObjectOverride;

export type ComponentOverrides = {
  [string]: ComponentOverride,
};

export type ComponentDefaults = {[string]: React.ComponentType<any>};
