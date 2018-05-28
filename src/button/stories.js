// @flow

import React from 'react';
import {storiesOf} from '@storybook/react';
import {Button, ButtonLink, ButtonGroup} from '.';
import {IconRightArrow, IconMagnifyingGlass, IconX} from '../icon';

const sampleStyle = {
  display: 'grid',
  gridGap: '1em',
  gridTemplateColumns: 'auto',
  justifyItems: 'start',
};

function ButtonSample(props) {
  return (
    <div style={sampleStyle}>
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
    </div>
  );
}

function ButtonLinkSample(props) {
  return (
    <div style={sampleStyle}>
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
    </div>
  );
}

storiesOf('Button', module)
  .add('Primary', () => <ButtonSample />)
  .add('Primary (Compact)', () => <ButtonSample $compact />)
  .add('Secondary', () => <ButtonSample $secondary />)
  .add('Secondary (Compact)', () => <ButtonSample $secondary $compact />)
  .add('Tertiary', () => <ButtonSample $tertiary />)
  .add('Tertiary (Compact)', () => <ButtonSample $tertiary $compact />)
  .add('Minimal', () => <ButtonSample $minimal />)
  .add('Minimal (Compact)', () => <ButtonSample $minimal $compact />)
  .add('Button Link', () => <ButtonLinkSample />)
  .add('Button Link (Compact)', () => <ButtonLinkSample $compact />)
  .add('Button Group', () => (
    <div style={sampleStyle}>
      <ButtonGroup>
        <Button>Button Label</Button>
        <Button>Button Label</Button>
        <Button>Button Label</Button>
      </ButtonGroup>
    </div>
  ));
