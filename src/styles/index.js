// @flow

// ===== COLORS
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        // Default to black
        r: 0,
        g: 0,
        b: 0,
      };
}

const hexColors = {
  // ===== Primary colors
  primary: '#1B6DE0',
  primaryShade: '#0D3670',
  primaryTone: '#4E77B0',
  primaryTint10: '#E8F0FC',
  primaryTint20: '#D1E2F9',
  primaryTint50: '#8DB6EF',

  // ===== System colors
  success: '#07A35A',
  successShade: '#00512B',
  successTone: '#40916C',
  successTint10: '#E5F6EE',
  successTint20: '#CCEDDD',
  successTint50: '#80D1AB',

  warning: '#ED6F0E',
  warningShade: '#763707',
  warningTone: '#B77847',
  warningTint10: '#FDF1E7',
  warningTint20: '#FBE2CF',
  warningTint50: '#F6B787',

  alert: '#E54937',
  alertShade: '#751D13',
  alertTone: '#B55D53',
  alertTint10: '#FDEBE9',
  alertTint20: '#FBD8D4',
  alertTint50: '#F59C93',

  // ===== Monochromatic
  black: '#000000',
  gray80: '#333333',
  gray60: '#666666',
  gray40: '#999999',
  gray30: '#B3B3B3',
  gray20: '#CCCCCC',
  gray10: '#E5E5E5', // @ardo
  gray6: '#F0F0F0',
  gray3: '#F7F7F7',
  white: '#FFFFFF',
};

type RGBEntry = {
  r: number,
  g: number,
  b: number,
  rgb: Array<number>,
};
const rgbColors: {[hexColorKey: string]: RGBEntry} = Object.keys(
  hexColors
).reduce((f, k) => {
  const rgb = hexToRgb(hexColors[k]);
  f[k] = {...rgb, rgb: [rgb.r, rgb.g, rgb.b]};
  return f;
}, {});

// ===== FONTS
const defaultFontSize = 14;
const fontSizes = {
  giant: `${defaultFontSize + 42}px`, // 56
  xxxxLarge: `${defaultFontSize + 26}px`, // 40
  xxxLarge: `${defaultFontSize + 18}px`, // 32
  xxLarge: `${defaultFontSize + 14}px`, // 28
  xLarge: `${defaultFontSize + 10}px`, // 24
  large: `${defaultFontSize + 6}px`, // 20
  medium: `${defaultFontSize + 2}px`, // 16
  normal: `${defaultFontSize}px`, // 14
  small: `${defaultFontSize - 2}px`, // 12
  xSmall: `${defaultFontSize - 3}px`, // 11
};
const defaultLineHeight = 24;
const lineHeights = {
  giant: `${defaultLineHeight + 56}px`, // 80
  xxxxLarge: `${defaultLineHeight + 32}px`, // 56
  xxxLarge: `${defaultLineHeight + 24}px`, // 48
  xxLarge: `${defaultLineHeight + 16}px`, // 40
  xLarge: `${defaultLineHeight + 12}px`, // 36
  large: `${defaultLineHeight + 4}px`, // 28
  medium: `${defaultLineHeight}px`, // 24
  normal: `${defaultLineHeight}px`, // 24
  small: `${defaultLineHeight - 4}px`, // 20
  xSmall: `${defaultLineHeight - 8}px`, // 16
};

const boxShadows = {
  normal: `1px 2px 2px 0 rgba(${rgbColors.black.rgb.join(',')}, 0.12)`,
  floatingResult: `0px 4px 16px 0 rgba(${rgbColors.black.rgb.join(',')}, 0.24)`,
  card: `0px 4px 4px 0 rgba(${rgbColors.black.rgb.join(',')}, 0.12)`,
};

const spreadBgColorStyles = {
  hoverNormal: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: hexColors.gray6,
    },
  },
};

const zIndexes = {
  modal: 1000,
};

/*
Add this into your `css-reset` plugin or <head>, whichever you want
 */
const stringDefaultCss = `
*{
  box-sizing: border-box;
}
*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.32);
}
`;

export {
  hexColors,
  rgbColors,
  fontSizes,
  lineHeights,
  boxShadows,
  zIndexes,
  /*
  Starting with `spread` means that you need to spread it, like this:
  const someStyle = {
    color: 'black',
    fontSize: fontSizes.normal,
    ...spreadBgColorStyles.hoverNormal,
  }
   */
  spreadBgColorStyles,
  stringDefaultCss,
};

export default {
  hexColors,
  rgbColors,
  fontSizes,
  lineHeights,
  boxShadows,
  zIndexes,
  spreadBgColorStyles,
  stringDefaultCss,
};
