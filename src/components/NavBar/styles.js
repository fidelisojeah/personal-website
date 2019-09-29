import styled, { css } from 'styled-components';

export const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        width: 42px;
        height: 42px;
    }
    svg{
        fill:none;
        user-select: none;
    }
`;


export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    padding: 0 50px;
    height: 100px;
    width: 100%;
    z-index: 20;
    transform: translateY(0px);
    ${(props) => props.theme.media.desktop(css`
        padding: 0 40px;
    `)}
    ${(props) => props.theme.media.tablet(css`
        padding: 0 25px;
    `)}
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 21;
    width: 100%;
    counter-reset: item 0;
    color: ${(props) => props.theme.colors.lightText};
`;
