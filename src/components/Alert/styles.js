import styled, { css } from 'styled-components';


export const AlertWrapper = styled.div`
    position: fixed;
    min-width: 250px;
    z-index: 520;
    top: 10px;
    right: 10px;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    background-color: #7f7f77;
    ${(props) => (props.success && css`background-color: ${props.theme.colors.transparentAlt}`)};
`;

export const Close = styled.button`
    position: absolute;
    left: 8px;
    top: 0px;
    cursor: pointer;
    font-size: 19px;
`;
