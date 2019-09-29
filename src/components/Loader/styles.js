import styled, { keyframes } from 'styled-components';


export const animation = keyframes`
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 28px 0;
    }
`;

export const LoaderWrapper = styled.div`
    width: 100%;
    height: 6px;
    border-radius: 3px;
    position: fixed;
    top: 0;
    z-index: 1000;
    background-size: 28px 28px;
    background-repeat: repeat;
    background-image: ${(props) => `
        repeating-linear-gradient(
            -45deg,
            ${props.theme.palette.white},
            ${props.theme.palette.secondary} 11px,
            ${props.theme.palette.light} 5px,
            ${props.theme.palette.light} 20px
        );
    `};
    animation: ${animation} 1s linear infinite;
    box-shadow: ${(props) => props.theme.shadows.small};
`;
