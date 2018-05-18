// @flow
import React from 'react';
import {styled} from 'styletron-react';
import {hexColors} from '../styles';

type Props = {
  $size?: 'small' | 'medium' | 'large',
  $spinnerPathBorderShade?: string,
  $spinnerBorderColor?: string,
};

const SIZES = {
  small: {
    width: '30px',
    height: '30px',
  },
  medium: {
    width: '44px',
    height: '44px',
  },
  large: {
    width: '58px',
    height: '58px',
  },
};
const rotatingAnimation = {
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
};
const StyledSpinnerContainer = styled(
  'div',
  (props: {$size: $PropertyType<Props, '$size'>}) => {
    const {$size} = props;
    return {
      display: 'inline-block',
      position: 'relative',
      ...(SIZES[$size] || SIZES.medium),
    };
  }
);
const StyledSpinnerShade = styled(
  'div',
  (props: {
    $size: $PropertyType<Props, '$size'>,
    $spinnerPathBorderShade: $PropertyType<Props, '$spinnerPathBorderShade'>,
  }) => {
    const {$size, $spinnerPathBorderShade} = props;
    return {
      position: 'absolute',
      border: `4px solid ${$spinnerPathBorderShade}`,
      borderRadius: '50%',
      ...(SIZES[$size] || SIZES.medium),
    };
  }
);
const StyledSpinnerProgress = styled(
  'div',
  (props: {
    $size: $PropertyType<Props, '$size'>,
    $spinnerBorderColor: $PropertyType<Props, '$spinnerBorderColor'>,
  }) => {
    const {$size, $spinnerBorderColor} = props;
    return {
      position: 'absolute',
      borderWidth: '4px',
      borderStyle: 'solid',
      borderRadius: '50%',
      borderColor: `${$spinnerBorderColor} transparent transparent transparent`,
      animationName: rotatingAnimation,
      animationIterationCount: 'infinite',
      animationDuration: '1s',
      animationTimingFunction: 'linear',
      ...(SIZES[$size] || SIZES.medium),
    };
  }
);

// eslint-disable-next-line
const Spinner = (props: Props) => {
  const {$size, $spinnerPathBorderShade, $spinnerBorderColor} = props;
  return (
    <div>
      <StyledSpinnerContainer $size={$size}>
        <StyledSpinnerShade
          $size={$size}
          $spinnerPathBorderShade={$spinnerPathBorderShade}
        />
        <StyledSpinnerProgress
          $size={$size}
          $spinnerBorderColor={$spinnerBorderColor}
        />
      </StyledSpinnerContainer>
    </div>
  );
};

Spinner.defaultProps = {
  $size: 'medium',
  $spinnerPathBorderShade: 'rgba(27, 109, 224, 0.32)',
  $spinnerBorderColor: hexColors.primary,
};

export default Spinner;
