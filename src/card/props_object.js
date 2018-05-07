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
  action?: Node,
  subcomponents?: {
    Body?: Node,
    Contents?: Node,
    HeaderImage?: Node,
    Thumbnail?: Node,
    Title?: Node,
    Wrapper?: Node,
  },
  subcomponentProps?: {
    BodyProps?: Object,
    ContentsProps?: Object,
    TitleProps?: Object,
    WrapperProps?: Object,
    headerImageProps?: Object,
    thumbnailProps?: Object,
  },
  children?: Node,
  headerImage?: String,
  thumbnail?: String,
  title: Node,
};

export const defaultSubcomponents = {
  Body: DefaultBody,
  Contents: DefaultContents,
  HeaderImage: DefaultHeaderImage,
  Thumbnail: DefaultThumbnail,
  Title: DefaultTitle,
  Wrapper: DefaultWrapper,
};

export const defaultSubcomponentProps = {
  BodyProps: {},
  ContentsProps: {},
  TitleProps: {},
  WrapperProps: {},
  headerImageProps: {
    alt: 'Header',
    style: {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      objectFit: 'contain',
      maxWidth: '100%',
    },
  },
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

class Card extends PureComponent {
  props: Props;

  render() {
    const {
      action,
      children,
      headerImage,
      subcomponents: {Body, Contents, HeaderImage, Thumbnail, Title, Wrapper},
      subcomponentProps: {
        BodyProps,
        ContentsProps,
        HeaderImageProps,
        ThumbnailProps,
        TitleProps,
      },
      thumbnail,
      title,
      ...otherProps
    } = this.props;
    return (
      <Wrapper {...otherProps}>
        {headerImage && <HeaderImage src={headerImage} {...HeaderImageProps} />}
        <Contents {...ContentsProps}>
          {thumbnail && <Thumbnail src={thumbnail} {...ThumbnailProps} />}
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
  action: null,
  subcomponents: defaultSubcomponents,
  children: null,
  headerImage: null,
  subcomponentProps: defaultSubcomponentProps,
  thumbnail: null,
};

export default Card;
