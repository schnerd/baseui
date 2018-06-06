import React from 'react';

import {storiesOf} from '@storybook/react';
// import {action} from '@storybook/addon-actions';

import {styled} from '../styles';
import {
  PLACEMENT,
  Popover,
  StatelessPopover,
  StyledPopoverPadding,
} from './index';

function popoverContent() {
  return (
    <StyledPopoverPadding>
      <div>
        <strong>The quick brown fox</strong>
      </div>
      <div>Jumped over the lazy dog</div>
    </StyledPopoverPadding>
  );
}

// TODO replace with real button when its available
const Button = styled('button', ({theme}) => ({
  padding: `${theme.sizing.scale200} ${theme.sizing.scale400}`,
  fontWeight: 'bold',
  backgroundColor: theme.colors.buttonPrimaryFill,
  borderRadius: '3px',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  transitionProperty: 'background-color',
  transitionDuration: '0.2s',
  fontSize: '14px',
  ':hover': {
    backgroundColor: theme.colors.buttonPrimaryHover,
  },
  ':focus': {
    backgroundColor: theme.colors.buttonPrimaryHover,
  },
  ':active': {
    backgroundColor: theme.colors.buttonPrimaryActive,
  },
}));

storiesOf('Popover', module)
  .add('stateless popover', () => (
    <StatelessPopover isOpen content={popoverContent}>
      <Button>Open</Button>
    </StatelessPopover>
  ))
  .add('stateful popover (click)', () => (
    <Popover content={popoverContent}>
      <Button>Press Me</Button>
    </Popover>
  ))
  .add('stateful popover (hover)', () => (
    <Popover
      triggerType="hover"
      content={popoverContent}
      onMouseLeaveDelay={200}
    >
      <Button>Hover Me</Button>
    </Popover>
  ))
  .add('popover placements', () => {
    const Container = styled('div', {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    });

    const Grid = styled('div', {
      display: 'grid',
      gridTemplateColumns: '20% 20% 20% 20% 20%',
      gridTemplateRows: '20% 20% 20% 20% 20%',
      width: '380px',
      height: '250px',
      margin: '100px auto',
    });

    const GridItem = styled('div', ({row, col}) => ({
      gridColumnStart: col,
      gridRowStart: row,
      textAlign: 'center',
    }));

    return (
      <Container>
        <Grid>
          <GridItem row={1} col={2}>
            <Popover placement={PLACEMENT.topLeft} content={popoverContent}>
              <Button>TL</Button>
            </Popover>
          </GridItem>
          <GridItem row={1} col={3}>
            <Popover placement={PLACEMENT.top} content={popoverContent}>
              <Button>Top</Button>
            </Popover>
          </GridItem>
          <GridItem row={1} col={4}>
            <Popover placement={PLACEMENT.topRight} content={popoverContent}>
              <Button>TR</Button>
            </Popover>
          </GridItem>
          <GridItem row={2} col={1}>
            <Popover placement={PLACEMENT.leftTop} content={popoverContent}>
              <Button>LT</Button>
            </Popover>
          </GridItem>
          <GridItem row={3} col={1}>
            <Popover placement={PLACEMENT.left} content={popoverContent}>
              <Button>Left</Button>
            </Popover>
          </GridItem>
          <GridItem row={4} col={1}>
            <Popover placement={PLACEMENT.leftBottom} content={popoverContent}>
              <Button>LB</Button>
            </Popover>
          </GridItem>
          <GridItem row={5} col={2}>
            <Popover placement={PLACEMENT.bottomLeft} content={popoverContent}>
              <Button>BL</Button>
            </Popover>
          </GridItem>
          <GridItem row={5} col={3}>
            <Popover placement={PLACEMENT.bottom} content={popoverContent}>
              <Button>Bottom</Button>
            </Popover>
          </GridItem>
          <GridItem row={5} col={4}>
            <Popover placement={PLACEMENT.bottomRight} content={popoverContent}>
              <Button>BR</Button>
            </Popover>
          </GridItem>
          <GridItem row={2} col={5}>
            <Popover placement={PLACEMENT.rightTop} content={popoverContent}>
              <Button>RT</Button>
            </Popover>
          </GridItem>
          <GridItem row={3} col={5}>
            <Popover placement={PLACEMENT.right} content={popoverContent}>
              <Button>Right</Button>
            </Popover>
          </GridItem>
          <GridItem row={4} col={5}>
            <Popover placement={PLACEMENT.rightBottom} content={popoverContent}>
              <Button>RB</Button>
            </Popover>
          </GridItem>
        </Grid>
      </Container>
    );
  });
