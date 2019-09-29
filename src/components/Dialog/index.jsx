import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import Portal from '<components>/Portal';
import LockFocus from '<components>/LockFocus';
import Overlay from '<components>/Overlay';
import { ModalTransition } from '<components>/transitions';

import { FilledScreen, InnerDialog, DialogPosition } from './styles';

const OnlyChild = ({ children }) => Children.toArray(children)[0] || null;

export default class Dialog extends PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool,
        ignoreOverlayClick: PropTypes.bool,
        onClose: PropTypes.func.isRequired,
        onOpenComplete: PropTypes.func,
        onKeyDown: PropTypes.func,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        isOpen: false,
        ignoreOverlayClick: false,
        onOpenComplete: () => ({}),
        onKeyDown: () => ({})
    };

    componentDidMount() {
        const { isOpen } = this.props;

        if (isOpen) {
            window.addEventListener('keydown', this.handleKeyDown);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleOverlayClick = (event) => {
        if (!this.props.ignoreOverlayClick) {
            this.props.onClose(event);
        }
    };

    handleKeyDown = (event) => {
        const { isOpen, onKeyDown, onClose } = this.props;

        if (event.key === 'Escape' && isOpen) {
            onClose(event);
        }
        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    render() {
        const {
            isOpen, children, onClose, onOpenComplete
        } = this.props;

        return (
            <Portal zIndex="unset">
                <TransitionGroup component={OnlyChild}>
                    {isOpen && (
                        <ModalTransition in={isOpen} onEntered={onOpenComplete} onExited={onClose}>
                            {({ fade, slide }) => (
                                <FilledScreen style={fade} aria-hidden={false}>
                                    <LockFocus isEnabled={isOpen}>
                                        <Overlay handleOverlayClick={this.handleOverlayClick} />
                                        <DialogPosition style={slide}>
                                            <InnerDialog role="dialog" tabIndex="-1">
                                                <div className="dialog-content">{children}</div>
                                            </InnerDialog>
                                        </DialogPosition>
                                    </LockFocus>
                                </FilledScreen>
                            )}
                        </ModalTransition>
                    )}
                </TransitionGroup>
            </Portal>
        );
    }
}
