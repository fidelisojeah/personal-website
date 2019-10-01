import styled, { css } from 'styled-components';
// import { media } from '<utils>';

export const Wrapper = styled.div`
    position: fixed;
    width: 60px;
    bottom: 90px;
    right: 60px;
    color: ${({ theme }) => theme.whiteText};
    ${({ theme }) => theme.media.desktop(css`
            right: 40px;
        `)}
    ${({ theme }) => theme.media.ipad(css`
            right: 25px;
        `)}
    ${({ theme }) => theme.media.tablet`bottom: 40px;`};

`;

export const SocialList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${({ theme }) => theme.media.tablet`flex-direction: row-reverse;`};

`;

export const SocialItem = styled.li`
    &:last-of-type {
        margin-bottom: 20px;
    ${({ theme }) => theme.media.tablet`margin-bottom: 0;`};

    }
`;

export const SocialItemLink = styled.a`
    padding: 10px;
    &:hover {
        transform: translateY(-3px);
        .github-icon {
            fill: #211F1F;
        }
        .stackoflow-icon {
            fill: #F47F24;
        }
        .linkedin-icon {
            fill: #006192;
        }
    }
    svg {
        width: 30px;
        height: 30px;
    }
    ${(props) => props.theme.media.tablet(css`
        padding: 20px;
        svg{
            width: 25px;
            height: 25px;
        }
    `)}
`;
