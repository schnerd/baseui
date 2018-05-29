// @flow

import React from 'react';
import {styled} from 'styletron-react';
import {storiesOf} from '@storybook/react';
import {Button, ButtonLink} from '.';
import {IconRightArrow, IconMagnifyingGlass, IconX} from '../icon';

const Sample = styled('div', {
  display: 'grid',
  gridGap: '1em',
  gridTemplateColumns: 'auto',
  justifyItems: 'start',
});

function ButtonSample(props) {
  return (
    <Sample>
      <Button {...props}>Button Label</Button>
      <Button {...props}>
        Button Label <IconRightArrow />
      </Button>
      <Button {...props}>
        <IconX /> Button Label
      </Button>
      <Button {...props}>
        <IconMagnifyingGlass />
      </Button>
      <Button {...props} $round>
        <IconMagnifyingGlass />
      </Button>
    </Sample>
  );
}

function ButtonLinkSample(props) {
  return (
    <Sample>
      <ButtonLink {...props}>Button Label</ButtonLink>
      <ButtonLink {...props}>
        Button Label <IconRightArrow />
      </ButtonLink>
      <ButtonLink {...props}>
        <IconX /> Button Label
      </ButtonLink>
      <ButtonLink {...props}>
        <IconMagnifyingGlass />
      </ButtonLink>
      <ButtonLink {...props} $round>
        <IconMagnifyingGlass />
      </ButtonLink>
    </Sample>
  );
}

storiesOf('Button', module)
  .add('Primary', () => <ButtonSample />)
  .add('Primary (Compact)', () => <ButtonSample $compact />)
  .add('Secondary', () => <ButtonSample $kind="secondary" />)
  .add('Secondary (Compact)', () => <ButtonSample $kind="secondary" $compact />)
  .add('Tertiary', () => <ButtonSample $kind="tertiary" />)
  .add('Tertiary (Compact)', () => <ButtonSample $kind="tertiary" $compact />)
  .add('Minimal', () => <ButtonSample $kind="minimal" />)
  .add('Minimal (Compact)', () => <ButtonSample $kind="minimal" $compact />)
  .add('Disabled', () => <ButtonSample disabled />)
  .add('Disabled (Compact)', () => <ButtonSample $compact disabled />)
  .add('Button Link', () => <ButtonLinkSample />)
  .add('Button Link (Compact)', () => <ButtonLinkSample $compact />);
