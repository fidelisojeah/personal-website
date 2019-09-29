import React from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

export const transitionDurationMs = 800;
export const transitionTimingFunction = 'cubic-bezier(0.2, 0, 0, 1) 0s';

export function TransitionHandler(props) {
    const {
        component: Tag = 'div',
        in: inProp,
        onExited,
        defaultStyles,
        transitionStyles,
        transitionProps,
        children,
        ...rest
    } = props;
    const timeout = { enter: 0, exit: transitionDurationMs };
    return (
        <Transition in={inProp} onExited={onExited} timeout={timeout} {...transitionProps}>
            {(state) => {
                const style = {
                    ...defaultStyles,
                    ...transitionStyles[state]
                };

                return <Tag style={style} {...rest}>{children}</Tag>;
            }}
        </Transition>
    );
}
TransitionHandler.defaultProps = {
    transitionProps: {
        appear: true,
        mountOnEnter: true,
        unmountOnExit: true
    },
    component: 'div',
    defaultStyles: {},
    transitionStyles: {},
    in: false,
    children: null
};

TransitionHandler.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    component: PropTypes.any,
    in: PropTypes.bool,
    onExited: PropTypes.func.isRequired,
    transitionProps: PropTypes.shape({
        appear: PropTypes.bool,
        mountOnEnter: PropTypes.bool,
        unmountOnExit: PropTypes.bool
    }),
    defaultStyles: PropTypes.objectOf(PropTypes.any),
    transitionStyles: PropTypes.objectOf(PropTypes.any),
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.any
};

export function Fade({ ...props }) {
    return (
        <TransitionHandler
            defaultStyles={{
                transition: `opacity ${transitionDurationMs}ms ${transitionTimingFunction}`,
                opacity: 0,
                position: 'fixed',
                zIndex: 500
            }}
            transitionStyles={{
                entering: { opacity: 0 },
                entered: { opacity: 1 }
            }}
            {...props}
        />
    );
}

export function Slide({ shouldUnmountOnExit = true, ...props }) {
    return (
        <TransitionHandler
            defaultStyles={{
                transition: `transform ${transitionDurationMs}ms ${transitionTimingFunction}, width ${transitionDurationMs}ms ${transitionTimingFunction}`,
                transform: 'translate3d(100%,0,0)'
            }}
            transitionStyles={{
                entered: { transform: null },
                exited: { transform: 'translate3d(100%,0,0)' }
            }}
            transitionProps={{
                appear: true,
                mountOnEnter: true,
                unmountOnExit: shouldUnmountOnExit
            }}
            {...props}
        />
    );
}

Slide.defaultProps = {
    shouldUnmountOnExit: false
};

Slide.propTypes = {
    shouldUnmountOnExit: PropTypes.bool
};

export function ModalTransition({
    in: hasEntered, onExited, onEntered, children
}) {
    const timeout = { enter: 0, exit: transitionDurationMs };

    return (
        <Transition
            in={hasEntered}
            timeout={timeout}
            onExited={onExited}
            onEntered={onEntered}
            appear
        >
            {(unadjustedState) => {
                const adjustedState = hasEntered && unadjustedState === 'exited' ? 'entering' : unadjustedState;

                const fadeBase = {
                    transition: `opacity ${transitionDurationMs / 2}ms`,
                    opacity: 1
                };

                const fadeTransitions = {
                    entering: {
                        opacity: 0
                    },
                    exiting: {
                        opacity: 0
                    }
                };
                // Slide styles
                const slideBase = {
                    transition: `transform ${transitionDurationMs}ms cubic-bezier(.25, .8, .25, 1)`,
                    transform: 'scale(1)'
                };
                const slideTransitions = {
                    entering: {
                        transform: 'scale(.4, .4)'
                    },
                    entered: {
                        transform: null
                    },
                    exiting: {
                        transform: 'scale(.4, .4)'
                    }
                };
                return children({
                    fade: { ...fadeBase, ...fadeTransitions[adjustedState] },
                    slide: { ...slideBase, ...slideTransitions[adjustedState] }
                });
            }}
        </Transition>
    );
}

ModalTransition.defaultProps = {
    in: false,
    children: null
};

ModalTransition.propTypes = {
    in: PropTypes.bool,
    onExited: PropTypes.func.isRequired,
    onEntered: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.any
};
