import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '<components>';
import {
    DialogHeader,
    DialogTitle,
    DialogTitleText,
    DialogClose,
    DialogBody,
    DialogFooter,
    DialogButton
} from '<components>/Dialog/styles';

import {
    Row,
    Input,
    ErrorMessage,
    TextArea
} from './styles';

function Contact(props) {
    return (
        <Dialog
            isOpen={props.isOpen}
            onClose={props.closeContact}
        >
            <DialogHeader>
                <DialogTitle>
                    <DialogTitleText>
                        Say Hi!
                    </DialogTitleText>
                </DialogTitle>
                <DialogClose
                    onClick={props.closeContact}
                >
                    <span />
                    <span />
                </DialogClose>
            </DialogHeader>
            <DialogBody>
                <div>
                    <Row>
                        <div>
                            <Input
                                type="text"
                                hasError={props.errors.name}
                                placeholder="Your Name."
                                name="name"
                                required
                                onChange={props.handleChange}
                                value={props.name}
                            />
                            <ErrorMessage
                                hasError={props.errors.name}
                            >
                                {props.errors.name || 'Please input your name.'}
                            </ErrorMessage>

                        </div>
                        <div>
                            <Input
                                hasError={props.errors.email}
                                type="email"
                                placeholder="Your Email Address."
                                name="email"
                                required
                                onChange={props.handleChange}
                                value={props.email}
                            />
                            <ErrorMessage
                                hasError={props.errors.email}
                            >
                                {props.errors.email || 'Please provide a valid email address.'}
                            </ErrorMessage>
                        </div>
                    </Row>
                    <Row>
                        <TextArea
                            name="message"
                            placeholder="Your message to me."
                            onChange={props.handleChange}
                            value={props.message}
                        />
                    </Row>
                </div>
                <DialogFooter>
                    <DialogButton
                        onClick={props.handleSubmit}
                        disabled={props.isSending || !props.isOpen}
                    >
                        Message Me
                    </DialogButton>
                </DialogFooter>
            </DialogBody>
        </Dialog>
    );
}

Contact.propTypes = {
    closeContact: PropTypes.func,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
    isSending: PropTypes.bool,
    isOpen: PropTypes.bool,
    errors: PropTypes.objectOf(PropTypes.string)
};

Contact.defaultProps = {
    closeContact: () => ({}),
    isSending: false,
    name: '',
    email: '',
    message: '',
    isOpen: false,
    errors: {}
};

export default React.memo(Contact);
