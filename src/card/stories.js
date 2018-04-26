import React from 'react';

import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs/react';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';

import Card from './Card';
import Heading from '../heading/Heading';
import Text from '../text/Text';
import Link from '../link/Link';
import Button from '../button/Button';
import pic from './Pic.jpeg';

const stories = storiesOf('Card', module);
const info = (story, context) => withInfo('common info')(story)(context);

stories.addDecorator(info);
stories.addDecorator(withKnobs);

const headline = <Heading size={1}>Card Title Entry</Heading>;
const text = (
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ipsum est,
    dictum id velit a, rhoncus pharetra nunc. Mauris gravida ex at mauris
    venenatis, et dignissim massa maximus. Praesent viverra sodales dolor. Ut eu
    mollis metus. Nulla egestas imperdiet turpis, in tincidunt enim tristique
    ut. Aliquam gravida, nibh in hendrerit dictum, nunc leo lacinia diam, non
    accumsan dui ante id erat. Pellentesque mollis feugiat nulla vitae
    tincidunt. Sed sit amet turpis tempus, accumsan lacus eu, molestie mi.
  </Text>
);
const link = (
  <Text color="darkBlue">
    <Link href="http://google.com">Go there</Link>
  </Text>
);
const button = (
  <Button onClick={action('clicked')}>
    <Heading size={1} color="white">
      Hello Button
    </Heading>
  </Button>
);
const image = <img src={pic} alt="card img" />;

stories
  .add('Headline, Text', () => {
    const props = {headline, text};

    return <Card {...props} />;
  })
  .add('Headline, Text, Link', () => {
    const props = {headline, text, action: link};

    return <Card {...props} />;
  })
  .add('Headline, Text, Button', () => {
    const props = {headline, text, action: button};

    return <Card {...props} />;
  })
  .add('Image, Headline', () => {
    const props = {headline, image};

    return <Card {...props} />;
  })
  .add('Image, Headline, Text', () => {
    const props = {headline, image, text};

    return <Card {...props} />;
  });
