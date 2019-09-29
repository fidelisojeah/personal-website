import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactFocusLock from 'react-focus-lock';

export default class LockFocus extends Component {
    static defaultProps = {
        autoFocus: true,
        isEnabled: true,
        shouldReturnFocus: true
    };

    static propTypes = {
        autoFocus: PropTypes.bool,
        isEnabled: PropTypes.bool,
        shouldReturnFocus: PropTypes.bool,
        children: PropTypes.node.isRequired
    };

    componentDidMount() {
        const { isEnabled, autoFocus } = this.props;
        if (typeof autoFocus === 'function' && isEnabled) {
            const elem = autoFocus();
            if (elem && elem.focus) {
                elem.focus();
            }
        }
    }

    render() {
        const { isEnabled, autoFocus, shouldReturnFocus } = this.props;
        return (
            <ReactFocusLock
                disabled={!isEnabled}
                autoFocus={!!autoFocus}
                returnFocus={shouldReturnFocus}
            >
                {this.props.children}
            </ReactFocusLock>
        );
    }
}
