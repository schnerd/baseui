// @flow
import React from 'react';

export type ConsumerProps = {
  onChange: Function,
  options: Array<Object>,
};

export type ChildrenProps = {
  onQueryChange: Function,
  onFocus: Function,
  onBlur: Function,
  onSelect: Function,
  results: $PropertyType<ConsumerProps, 'options'>,
} & ConsumerProps &
  State;

type Props = {
  // Children must be a function
  children: Function,
} & ConsumerProps;

type State = {
  query: string,
  isFocused: boolean,
};

// HOC to add provider functionality to a root component
export default class AutocompleteStatefulContainer extends React.Component<
  Props,
  State
> {
  state = {
    query: '',
    isFocused: false,
  };

  getFilteredResults(): $PropertyType<ConsumerProps, 'options'> {
    const {query} = this.state;
    return this.props.options.filter(
      o => o.label.toLowerCase().indexOf(query) >= 0
    );
  }

  handleQueryChange = (evt: Object): void => {
    this.setState({query: evt.target.value});
  };

  handleFocus = (): void => {
    this.setState({isFocused: true});
  };

  handleBlur = (): void => {
    this.setState({isFocused: false});
  };

  handleSelect = (result: Object): void => {
    this.setState({query: result.label});
    this.props.onChange(result);
  };

  _getPropsForChildrenFunction(): ChildrenProps {
    // Spread and remove 'children'
    const {children, ...props} = this.props;
    return {
      ...props,
      ...this.state,
      onQueryChange: this.handleQueryChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onSelect: this.handleSelect,
      results: this.getFilteredResults(),
    };
  }

  render() {
    return this.props.children({...this._getPropsForChildrenFunction()});
  }
}
