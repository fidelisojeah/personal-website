import { Component } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import { canUseDOM } from 'exenv';

export default class Portal extends Component {
    static defaultProps = {
        zIndex: 'unset'
    };

    static propTypes = {
        zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            container: this.createContainer(),
            portalIsMounted: false
        };
    }

    componentDidMount() {
        const { container } = this.state;
        const { zIndex } = this.props;

        if (container) {
            this.portalParent().appendChild(container);
        } else {
            // SSR path
            const newContainer = this.createContainer(zIndex);

            this.setState({ container: newContainer });
        }

        this.setState({
            portalIsMounted: true
        });
    }

    componentWillUnmount() {
        const { container } = this.state;

        if (container) {
            this.portalParent().removeChild(container);
            document.body.removeChild(this.portalParent());
        }
    }

    portalParent = () => {
        const parentElement = document.querySelector('body > .portal-container');

        if (!parentElement) {
            const parent = document.createElement('div');
            parent.setAttribute('class', 'portal-container');
            parent.setAttribute('style', 'display: flex;');
            document.body.appendChild(parent);
            return parent;
        }

        return parentElement;
    };

    createContainer = () => {
        if (!canUseDOM) {
            return undefined;
        }
        const container = document.createElement('div');
        const { zIndex } = this.props;

        container.setAttribute('class', 'portal');
        container.setAttribute('style', `z-index: ${zIndex};`);
        return container;
    };

    render() {
        const { container, portalIsMounted } = this.state;

        return container && portalIsMounted ? createPortal(this.props.children, container) : null;
    }
}
