import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    counter-reset: section;
    display: flex;
    flex-direction: column;
    color: white;
    background: linear-gradient(20deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondPrimary});
    box-sizing: border-box;
    min-height: 100vh;
    padding: 0 150px;
    ${({ theme }) => theme.media.ipad(css`padding: 0 100px;`)}
    ${({ theme }) => theme.media.tablet(css`padding: 0 20px;`)}
    ${({ theme }) => theme.media.tinyScreen(css`padding: 0 10px;`)}
`;

export const Content = styled.div`
    max-width: 100%;
    transition: transform 150ms ease-out;
`;

export const Section = styled.section`
    margin: 0 auto;
    max-width: 1000px;
`;

export const Hero = styled(Section)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    min-height: 100vh;
    padding-top: 150px;
    div {
        width: 100%;
    }
    ${({ theme }) => theme.media.ipad(css`padding-top: 0;`)}
`;

export const Intro = styled.h1`
    color: ${(props) => props.theme.colors.white};
    margin: 0 0 20px 3px;
    font-size: ${(props) => props.theme.fontSizes.large};
    ${(props) => props.theme.media.ipad(css`font-size: ${props.theme.fontSizes.medium};`)}
    ${(props) => props.theme.media.tablet(css`font-size: ${props.theme.fontSizes.small};`)}
`;

export const Name = styled.h2`

    font-size: 80px;
    line-height: 1.1;
    margin: 0;
    ${({ theme }) => `text-shadow: -1px 1px 2px ${theme.palette.secondary}, 1px 1px 2px ${theme.palette.secondary}, 1px -1px 0 ${theme.palette.secondary}, -1px -1px 0 ${theme.palette.secondary};`}
    ${({ theme }) => theme.media.ipad`font-size: 60px;`};
    ${({ theme }) => theme.media.tablet`font-size: 40px;`};
    ${({ theme }) => theme.media.tinyScreen`font-size: 30px;`};
`;


export const Info = styled.div`
    margin-top: 25px;
    width: 50%;
    max-width: 500px;
    color: ${(props) => props.theme.colors.lightText};
`;


export const buttonCSS = css`
    ${(props) => `
        background: ${props.theme.palette.white};
        border-radius: 3px;
        color: ${props.theme.palette.primary};
        box-shadow: ${props.theme.shadows.small};
        transition: all 1s cubic-bezier(.25, .8, .25, 1);
        text-decoration: none;
        cursor: pointer;
        padding: 16px 24px;
        &:hover {
            box-shadow: ${props.theme.shadows.raised};
            color: ${props.theme.palette.primary};
        }
        &:active,
        &:focus {
            box-shadow: none;
            color: ${props.theme.palette.primary};
        }
    `}
`;

export const AltButton = styled.button`
    background: transparent;
    border-radius: 3px;
    transition: all 1s cubic-bezier(.25, .8, .25, 1);
    padding: 16px 24px;
    cursor: pointer;
    text-decoration: none;
    border: 2px solid ${(props) => props.theme.colors.lightText};
    color: ${(props) => props.theme.colors.lightText};
    &:hover,
    &:active,
    &:focus {
        color: #ffffff;
        background: ${(props) => props.theme.colors.transparentPrimary};
        border-color: ${(props) => props.theme.colors.transparentPrimary};
    }
`;

export const DownloadCV = styled.a`
    ${buttonCSS};
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-right: 30px;
`;
