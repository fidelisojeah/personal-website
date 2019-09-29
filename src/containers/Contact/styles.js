import styled, { keyframes, css } from 'styled-components';

const shake = keyframes`
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
`;

const shakeTransform = css`
    animation: ${shake} 0.82s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
`;

export const Input = styled.input`
    transition: all .25s ease-in-out;
    background-color: rgba(38,169,234,.5);
    color: #fff;
    border: none;
    width: 100%;
    outline: none;
    padding: 16px 20px;
    font-size: 14px;
    line-height: 1.6;
    margin: 0 15px;
    ${(props) => props.hasError && css`
        background-color: rgba(225,57,93,.6);
        ${shakeTransform}
    `}
    ${(props) => props.disabled && css`
        background-color: rgba(38,169,234,.5);
    `}
    &:focus {
        background-color: rgba(38,169,234,.7);
    }
`;

export const TextArea = styled.textarea`
    transition: all .25s ease-in-out;
    background-color: rgba(38,169,234,.5);
    color: #fff;
    border: none;
    width: 100%;
    outline: none;
    height: 160px;
    padding: 16px 20px;
    font-size: 14px;
    line-height: 1.6;
    margin: 0 15px;
    resize: none;
    ${(props) => props.hasError && css`
        background-color: rgba(225,57,93,.6);
    `}
    ${(props) => props.disabled && css`
        background-color: rgba(38,169,234,.5);
    `}
    &:focus {
        background-color: rgba(38,169,234,.7);
    }
`;

export const ErrorMessage = styled.small`
    color: rgba(225,57,93,1);
    font-size: 12px;
    display: block;
    line-height: 21px;
    margin: .25rem 15px;
    ${(props) => !props.hasError && css`
        color: transparent;
        visibility: hidden;
    `}
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 10px;
    flex-wrap: wrap;
    >div{
        flex: 0 0 50%;
        display: flex;
        flex-flow: wrap;
    }
    ${(props) => props.theme.media.tablet(css`
        flex-direction: column;
        flex-flow: wrap;
        align-items: center;
        flex-grow: 1;
        justify-content: space-around;
        >div{
            flex: 0 0 100%;
        }
        input {
            margin-top: 20px;
        }
    `)};
`;
