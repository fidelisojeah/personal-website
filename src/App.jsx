import React, { PureComponent } from 'react';
import AOS from 'aos';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';


import { helmetConfig } from '<utils>';
import { Social, Loader, Alert } from '<components>';
import { Home } from '<containers>';

class App extends PureComponent {
    static defaultProps = {
        social: []
    }

    static propTypes = {
        social: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
                icon: PropTypes.string
            })
        )
    }

    componentDidMount() {
        AOS.init({
            duration: 2000
        });
    }

    render() {
        return (
            <div>
                <Helmet {...helmetConfig} />
                <Loader />
                <Social
                    socialLinks={this.props.social}
                />
                <Alert />
                <Home />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {
        social
    } = state.homePage;
    return {
        social
    };
}

export default connect(mapStateToProps)(App);
