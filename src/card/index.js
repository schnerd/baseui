/* @flow */

import React, {PureComponent} from 'react';

import type {Node} from 'react';
import {
  DefaultBody,
  DefaultContents,
  DefaultHeaderImage,
  DefaultThumbnail,
  DefaultTitle,
  DefaultWrapper,
} from './index-styled-components';

type Props = {
  Body?: Node,
  BodyProps?: Object,
  Contents?: Node,
  ContentsProps?: Object,
  HeaderImage?: Node,
  Thumbnail?: Node,
  Title?: Node,
  TitleProps?: Object,
  Wrapper?: Node,
  WrapperProps?: Object,
  action?: Node,
  children?: Node,
  headerImage?: String,
  headerImageProps?: Object,
  thumbnail?: String,
  thumbnailProps?: Object,
  title: Node,
};

class Card extends PureComponent {
  props: Props;

  render() {
    const {
      Body,
      BodyProps,
      Contents,
      ContentsProps,
      HeaderImage,
      Thumbnail,
      Title,
      TitleProps,
      Wrapper,
      action,
      children,
      headerImage,
      headerImageProps,
      thumbnail,
      thumbnailProps,
      title,
      ...otherProps
    } = this.props;
    return (
      <Wrapper {...otherProps}>
        {headerImage && <HeaderImage src={headerImage} {...headerImageProps} />}
        <Contents {...ContentsProps}>
          {thumbnail && <Thumbnail src={thumbnail} {...thumbnailProps} />}
          {title && (
            <Title hasThumbnail={Boolean(thumbnail)} {...TitleProps}>
              {title}
            </Title>
          )}
          <Body {...BodyProps}>{children}</Body>
          {action}
        </Contents>
      </Wrapper>
    );
  }
}

Card.defaultProps = {
  Body: DefaultBody,
  BodyProps: {},
  Contents: DefaultContents,
  ContentsProps: {},
  HeaderImage: DefaultHeaderImage,
  Thumbnail: DefaultThumbnail,
  Title: DefaultTitle,
  TitleProps: {},
  Wrapper: DefaultWrapper,
  WrapperProps: {},
  action: null,
  children: null,
  headerImage: null,
  headerImageProps: {
    alt: 'Header',
    style: {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      objectFit: 'contain',
      maxWidth: '100%',
    },
  },
  thumbnail: null,
  thumbnailProps: {
    alt: 'Thumbnail',
    style: {
      float: 'right',
      height: '96px',
      width: '96px',
      objectFit: 'cover',
      borderRadius: '4px',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      margin: '0 0 20px 20px',
    },
  },
};

export default Card;
