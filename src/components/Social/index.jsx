import React from 'react';
import PropTypes from 'prop-types';

import {
    Wrapper,
    SocialList,
    SocialItemLink,
    SocialItem
} from './styles';

import Icons from './Icons';

function Social({ socialLinks }) {
    return (
        <Wrapper>
            <SocialList>
                {Array.isArray(socialLinks)
                    && socialLinks.map(({ url, icon }) => (
                        <SocialItem
                            key={icon}
                        >
                            <SocialItemLink
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={icon}
                            >
                                <Icons icon={icon} />
                            </SocialItemLink>
                        </SocialItem>
                    ))}
            </SocialList>
        </Wrapper>
    );
}

Social.propTypes = {
    socialLinks: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            icon: PropTypes.string
        })
    )
};

Social.defaultProps = {
    socialLinks: []
};

export default React.memo(Social);
