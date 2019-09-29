import { css } from 'styled-components';

import themes from '../theme';

const media = Object.keys(themes.breakpoints).reduce((previousValue, breakpoint) => {
    const result = previousValue;
    result[breakpoint] = (inner) => css`
        @media (max-width: ${themes.breakpoints[breakpoint] / 16}em) {
            ${inner}
        }
    `;
    return result;
}, {});

export default media;
