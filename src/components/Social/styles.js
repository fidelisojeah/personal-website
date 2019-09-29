import styled, { css } from 'styled-components';
// import { media } from '<utils>';

export const Wrapper = styled.div`
    position: fixed;
    width: 60px;
    bottom: 90px;
    right: 60px;
    color: ${(props) => props.theme.whiteText};
    ${(props) => props.theme.media.desktop(css`
            right: 40px;
        `)}
    ${(props) => props.theme.media.ipad(css`
            right: 25px;
        `)}
`;

export const SocialList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SocialItem = styled.li`
    &:last-of-type {
        margin-bottom: 20px;
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
