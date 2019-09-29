import { css } from 'styled-components';

const breakpoints = {
    tinyScreen: 375,
    tablet: 600,
    ipad: 1000,
    desktop: 1200,
    giantDesktop: 1440
};

const media = Object.keys(breakpoints).reduce((previousValue, breakpoint) => {
    const result = previousValue;
    result[breakpoint] = (inner) => css`
        @media (max-width: ${breakpoints[breakpoint] / 16}em) {
            ${inner}
        }
    `;
    return result;
}, {});

const palette = {
    white: '#ffffff',
    offWhite: '#fff9f1',
    grey: '#4f4f4f',
    blue: '#3fa9f5',
    alternate: '#19A766',
    fourth: '#F19824',
    primary: '#f15a24',
    secondPrimary: 'rgb(203,79,79)',
    light: '#fcdfd5',
    secondary: '#1F689B'
};

const theme = {
    palette,
    breakpoints,
    media,
    shadows: {
        small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        raised: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);'
    },
    fontSizes: {
        xsmall: '12px',
        smallish: '13px',
        small: '14px',
        medium: '16px',
        large: '18px',
        xlarge: '20px',
        xxlarge: '22px',
        h3: '32px'
    },
    colors: {
        white: palette.white,
        offWhite: palette.offWhite,
        secondary: palette.secondary,
        textPrimary: palette.grey,
        primary: palette.primary,
        secondPrimary: palette.secondPrimary,
        lightText: palette.light,
        transparentPrimary: 'rgba(251, 211, 196, 0.3)',
        transparentAlt: 'rgba(25, 255, 102, 0.6)'
    }
};

export default theme;
