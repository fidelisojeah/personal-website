import React, { Children } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import Portal from '<components>/Portal';
import { Slide } from '<components>/transitions';
import { AlertWrapper } from './styles';

const OnlyChild = ({ children }) => Children.toArray(children)[0] || null;

function Alert({ text, type, isOpen }) {
    return (
        <Portal zIndex="unset">
            <TransitionGroup component={OnlyChild}>
                {isOpen && text && (
                    <Slide
                        in={isOpen}
                        component={AlertWrapper}
                        shouldUnmountOnExit
                        success={type === 'success'}
                    >
                        {text}
                    </Slide>
                )}
            </TransitionGroup>
        </Portal>
    );
}
Alert.propTypes = {
    isOpen: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string
};

Alert.defaultProps = {
    isOpen: false,
    text: '',
    type: ''
};


function mapStatesToProps(state) {
    const { alert } = state;
    return {
        isOpen: alert.isOpen || false,
        text: alert.text || '',
        type: alert.type || ''
    };
}

export default connect(mapStatesToProps)(React.memo(Alert));
