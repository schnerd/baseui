import {styled} from 'styletron-react';

export const DefaultBody = styled('div', {
  fontSize: '14px',
  marginBottom: '24px',
  color: '#5F5F5F',
});

export const DefaultContents = styled('div', {
  margin: '24px',
});

export const DefaultHeaderImage = styled('img', {
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  objectFit: 'contain',
  maxWidth: '100%',
});

export const DefaultThumbnail = styled('img', {
  float: 'right',
  height: '96px',
  width: '96px',
  objectFit: 'cover',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  margin: '0 0 20px 20px',
});

export const DefaultTitle = styled('h1', props => ({
  fontSize: props.hasThumbnail ? '16px' : '20px',
  fontWeight: '400',
  lineHeight: '28px',
  margin: '0 0 12px 0',
  padding: 0,
}));

export const DefaultWrapper = styled('div', () => ({
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '4px',
  fontFamily: 'ff-clan-web-pro,"Helvetica Neue",Helvetica,sans-serif',
}));
