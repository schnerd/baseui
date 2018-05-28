// @flow

import React from 'react';
import Button from './button';

type Props = {
  href?: string,
};

export default function ButtonLink(props: Props) {
  return <Button $as="a" {...props} />;
}

ButtonLink.defaultProps = {
  href: '#',
};
