import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadHomePage } from '<store>/reducers/home';
import { sendMessage } from '<store>/reducers/contact';

import {
    Wrapper,
    Content,
    Hero,
    Intro,
    Name,
    Info,
    DownloadCV,
    AltButton
} from './styles';

import Contact from '../Contact';

const name = 'I\'m Fidelis.';
const info = 'I\'m a Full stack Software engineer with experience working with javascript and python frameworks like: React, Node, Django.';
const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

class Home extends PureComponent {
    static propTypes = {
        sendMessage: PropTypes.func.isRequired,
        loadHomePage: PropTypes.func.isRequired,
        resume: PropTypes.shape({ link: PropTypes.string }),
        isSending: PropTypes.bool,
        hasSent: PropTypes.bool,
    };

    static defaultProps = {
        resume: {
            link: ''
        },
        isSending: false,
        hasSent: false,
    }

    state = {
        isOpen: false,
        name: '',
        email: '',
        message: '',
        errors: {}
    };

    componentDidMount() {
        this.props.loadHomePage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.hasSent !== this.props.hasSent && this.props.hasSent) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                isOpen: false
            });
        }
    }

    closeContactModal = (event) => {
        event.preventDefault && event.preventDefault();
        this.setState({
            isOpen: false
        });
    }

    openContactModal = (event) => {
        event.preventDefault && event.preventDefault();
        this.setState({
            isOpen: true,
            errors: {},
            name: '',
            email: '',
            message: ''
        });
    }

    handleChange = (event) => {
        if (!event || !event.target) {
            return null;
        }
        const element = event.target.name;
        const { value } = event.target;
        return this.setState((state) => {
            const { errors } = state;
            delete errors[element];
            return {
                [element]: value,
                errors
            };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault && event.preventDefault();

        const errors = {};

        if (!this.validateEmail(this.state.email)) {
            errors.email = 'Please provide a valid email address.';
        } else {
            delete errors.email;
        }
        if (!this.state.name) {
            errors.name = 'Please input your name.';
        } else {
            delete errors.name;
        }

        if (Object.keys(errors).length >= 1) {
            this.setState({ errors });
        } else {
            this.props.sendMessage({
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    validateEmail(emailAddress) {
        return emailRegex.test(emailAddress);
    }

    render() {
        return (
            <Wrapper>
                <Contact
                    isOpen={this.state.isOpen}
                    closeContact={this.closeContactModal}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    name={this.state.name}
                    email={this.state.email}
                    message={this.state.message}
                    errors={this.state.errors}
                    isSending={this.props.isSending}
                />
                <Content>
                    <Hero>
                        <Intro>Hi,</Intro>
                        <div
                            data-aos="slide-up"
                            data-aos-once="true"
                        >
                            <Name>{name}</Name>
                        </div>
                        <div
                            data-aos="slide-up"
                            data-aos-once="true"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                        >

                            <Info>
                                {info}
                            </Info>
                        </div>
                        <div
                            style={{
                                marginTop: '30px',
                                dispay: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                            data-aos="zoom-in-left"
                            data-aos-offset="200"
                            data-aos-delay="70"
                            data-aos-easing="ease-in-out"
                        >
                            <DownloadCV
                                href={this.props.resume.link}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                            >
                                Download my CV
                            </DownloadCV>
                            <AltButton
                                onClick={this.openContactModal}
                            >
                                Contact Me!
                            </AltButton>
                        </div>
                    </Hero>
                </Content>
            </Wrapper>
        );
    }
}

const mapDispatchToProps = {
    sendMessage,
    loadHomePage
};

function mapStateToProps(state, ownProps) {
    const { isSending, hasSent } = state.message;
    const { resume } = state.homePage;

    return { isSending, hasSent, resume };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
