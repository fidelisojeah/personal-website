import styled, { css } from 'styled-components';

export const FilledScreen = styled.div`
    height: 100vh;
    left: 0;
    top: 0;
    overflow-y: auto;
    z-index: 510;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-overflow-scrolling: touch;
    >div{
        display: flex;
        justify-content: center;
        align-items: center;
        ${(props) => props.theme.media.tablet(css`
            align-items: normal;
        `)}
    }
`;

export const DialogPosition = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 119px);
    max-width: calc(100% - 120px);
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    z-index: 510;
    pointer-events: none;
    justify-content: center;
    align-items: center;
    ${(props) => props.theme.media.tablet(css`
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        max-width: 100%;
        align-items: normal;
        width: 100%;
    `)}
`;

export const InnerDialog = styled.div`
    background-color: ${(props) => props.theme.colors.offWhite};
    line-height: 68px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    outline: 0;
    height: auto;
    border-radius: 3px;
    max-height: 100%;
    box-shadow: ${(props) => props.theme.shadows.small};
    ${(props) => props.theme.media.tablet(css`
        height: 100%;
        max-height: 100%;
        border-radius: 0px;
        .dialog-content {
            height: 100%;
        }
    `)};
    @media only screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        max-height: calc(100% - 1px);
    }
`;

export const DialogHeader = styled.div`
    position: relative;
    min-width: ${(props) => props.theme.breakpoints.tablet}px;
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    transition: box-shadow 200ms;
    z-index: 1;
    margin-bottom: 20px;
    padding: 20px 0;
    flex-direction: column;
    ${(props) => props.theme.media.tablet(css`
        position: absolute;
    `)};
`;

export const DialogClose = styled.div`
    position: absolute;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    top: 29px;
    align-self: flex-end;
    display: flex;
    span {
        display: block;
        height: 2px;
        width: 23px;
        background: #444444;
        opacity: 1;
        position: absolute;
        right: 11px;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
        &:nth-child(1) {
            top: 21px;
            transform: rotate(135deg);
        }
        &:nth-child(2) {
            top: 21px;
            transform: rotate(-135deg);
        }
    }
    &:hover span:nth-child(1) {
        transform: rotate(0);
    }
    &:hover span:nth-child(2) {
        transform: rotate(0);
    }
    ${(props) => props.theme.media.tablet(css`
        align-self: normal;
    `)};
`;

export const DialogTitle = styled.div`
    align-items: center;
    display: flex;
    font-size: 42px;
    font-style: inherit;
    letter-spacing: -0.008em;
    line-height: 1.5;
    margin: 0;
    min-width: 0;
    padding-left: 14px;
    ${(props) => props.theme.media.tablet(css`
        align-self: center;
        padding-left: 0;
    `)};
`;

export const DialogTitleText = styled.span`
    flex: 1 1 auto;
    min-width: 0;
    word-wrap: break-word;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DialogFooter = styled.div`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    transition: box-shadow 200ms;
    z-index: 1;
    padding: 14px 25px 20px;
`;

export const DialogBody = styled.div`
    ${(props) => props.theme.media.tablet(css`
        display: flex;
        align-self: center;
        align-items: center;
        height: 100%;
        justify-content: center;
        flex-direction: column;
        >div{
            display: flex;
            flex-direction: column;
        }
    `)};
`;

export const DialogButton = styled.button`
    background: rgba(255, 255, 255, 0.7);
    border-radius: 3px;
    transition: all 1.4s cubic-bezier(.25, .8, .25, 1);
    padding: 16px 24px;
    cursor: pointer;
    text-decoration: none;
    border: 2px solid ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.secondary};
    &:hover,
    &:active,
    &:focus {
        color: ${(props) => props.theme.colors.primary};
        border-color: ${(props) => props.theme.colors.primary};
    }
    ${(props) => props.disabled && css`
        border-color: rgba(20,20,20,.5);
        color: rgb(20,20,20);
    `}
`;
