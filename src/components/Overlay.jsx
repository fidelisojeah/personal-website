import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OverlayWrapper = styled.div`
    bottom: 0px;
    left: 0px;
    opacity: 1;
    pointer-events: initial;
    position: fixed;
    right: 0px;
    top: 0px;
    z-index: 500;
    background: rgba(90, 107, 137, 0.54);
    transition: opacity 220ms ease 0s;
`;

function Overlay(props) {
    return (
        <OverlayWrapper
            className={`overlay ${props.className ? props.className : ''}`}
            role="presentation"
            onClick={props.handleOverlayClick}
        />
    );
}

Overlay.propTypes = {
    handleOverlayClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

Overlay.defaultProps = {
    className: ''
};

export default React.memo(Overlay);
