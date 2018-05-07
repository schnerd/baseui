import React from 'react';

import {Button, LinkButton} from '@uber/react-button';
import {storiesOf} from '@storybook/react';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';

import Card from './index';
import CardPropsObject from './props_object';

const engine = new Styletron();

const placeholderText =
  'Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus cursus. Etiam semper luctus sem ac blandit. ';

storiesOf('Card', module)
  .addDecorator(story => (
    <StyletronProvider value={engine}>{story()}</StyletronProvider>
  ))
  .add('Headline & Text', () => (
    <Card title="Card Title Entry" style={{width: '328px'}}>
      {placeholderText}
    </Card>
  ))
  .add('Text only', () => (
    <Card style={{width: '328px'}}>{placeholderText}</Card>
  ))
  .add('Text w/Link', () => (
    <Card
      action={
        <LinkButton
          style={{
            marginLeft: '-20px',
          }}
        >
          Link to a Place&nbsp;&nbsp;&nbsp;&gt;
        </LinkButton>
      }
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </Card>
  ))
  .add('Text w/Button', () => (
    <Card
      action={<Button style={{width: '100%'}}>Button Label</Button>}
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </Card>
  ))
  .add('Headline & Text w/Thumbnail', () => (
    <Card
      thumbnail="thumbnail.png"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </Card>
  ))
  .add('w/Thumbnail & Link', () => (
    <Card
      action={
        <LinkButton
          style={{
            marginLeft: '-20px',
          }}
        >
          Link to a Place&nbsp;&nbsp;&nbsp;&gt;
        </LinkButton>
      }
      thumbnail="thumbnail.png"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </Card>
  ))
  .add('w/Thumbnail & Button', () => (
    <Card
      action={<Button style={{width: '100%'}}>Button Label</Button>}
      thumbnail="thumbnail.png"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </Card>
  ))
  .add('Headline w/Image', () => (
    <Card
      headerImage="card_header.jpeg"
      title="Card Title"
      style={{width: '328px'}}
    />
  ))
  .add('Text w/Image', () => (
    <Card
      headerImage="card_header.jpeg"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </Card>
  ))
  .add('Text w/Image & Link', () => (
    <Card
      action={
        <LinkButton
          style={{
            marginLeft: '-20px',
          }}
        >
          Link to a Place&nbsp;&nbsp;&nbsp;&gt;
        </LinkButton>
      }
      headerImage="card_header.jpeg"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </Card>
  ))
  .add('Text w/Image & Button', () => (
    <Card
      action={<Button style={{width: '100%'}}>Button Label</Button>}
      headerImage="card_header.jpeg"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </Card>
  ));

storiesOf('Card - Props Object', module)
  .addDecorator(story => (
    <StyletronProvider value={engine}>{story()}</StyletronProvider>
  ))
  .add('Headline & Text', () => (
    <CardPropsObject title="Card Title Entry" style={{width: '328px'}}>
      {placeholderText}
    </CardPropsObject>
  ))
  .add('Text only', () => (
    <CardPropsObject style={{width: '328px'}}>
      {placeholderText}
    </CardPropsObject>
  ))
  .add('Text w/Link', () => (
    <CardPropsObject
      action={
        <LinkButton
          style={{
            marginLeft: '-20px',
          }}
        >
          Link to a Place&nbsp;&nbsp;&nbsp;&gt;
        </LinkButton>
      }
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </CardPropsObject>
  ))
  .add('Text w/Button', () => (
    <CardPropsObject
      action={<Button style={{width: '100%'}}>Button Label</Button>}
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </CardPropsObject>
  ))
  .add('Headline & Text w/Thumbnail', () => (
    <CardPropsObject
      thumbnail="thumbnail.png"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </CardPropsObject>
  ))
  .add('w/Thumbnail & Link', () => (
    <CardPropsObject
      action={
        <LinkButton
          style={{
            marginLeft: '-20px',
          }}
        >
          Link to a Place&nbsp;&nbsp;&nbsp;&gt;
        </LinkButton>
      }
      thumbnail="thumbnail.png"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </CardPropsObject>
  ))
  .add('w/Thumbnail & Button', () => (
    <CardPropsObject
      action={<Button style={{width: '100%'}}>Button Label</Button>}
      thumbnail="thumbnail.png"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </CardPropsObject>
  ))
  .add('Headline w/Image', () => (
    <CardPropsObject
      headerImage="card_header.jpeg"
      title="Card Title"
      style={{width: '328px'}}
    />
  ))
  .add('Text w/Image', () => (
    <CardPropsObject
      headerImage="card_header.jpeg"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </CardPropsObject>
  ))
  .add('Text w/Image & Link', () => (
    <CardPropsObject
      action={
        <LinkButton
          style={{
            marginLeft: '-20px',
          }}
        >
          Link to a Place&nbsp;&nbsp;&nbsp;&gt;
        </LinkButton>
      }
      headerImage="card_header.jpeg"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </CardPropsObject>
  ))
  .add('Text w/Image & Button', () => (
    <CardPropsObject
      action={<Button style={{width: '100%'}}>Button Label</Button>}
      headerImage="card_header.jpeg"
      title="Card Title Entry"
      style={{width: '328px'}}
    >
      {placeholderText}
    </CardPropsObject>
  ));
