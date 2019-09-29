import { contactConstants } from '<constants>';

export function sendMessage(data) {
    return {
        type: contactConstants.CONTACT_ME_REQUEST,
        data
    };
}

export function sendMessageSuccess() {
    return {
        type: contactConstants.CONTACT_ME_REQUEST_SUCCESS
    };
}

export function sendMessageFailure(error) {
    return {
        type: contactConstants.CONTACT_ME_REQUEST_FAILURE,
        data: error
    };
}

export default function message(state = {
    isSending: false,
    hasSent: false,
    error: null
}, action) {
    switch (action.type) {
        case contactConstants.CONTACT_ME_REQUEST:
            return {
                ...state,
                isSending: true,
                hasSent: false,
                error: null
            };
        case contactConstants.CONTACT_ME_REQUEST_SUCCESS:
            return {
                ...state,
                isSending: false,
                hasSent: true,
                error: null
            };
        case contactConstants.CONTACT_ME_REQUEST_FAILURE:
            return {
                ...state,
                isSending: false,
                hasSent: false,
                error: action.error
            };
        default:
            return state;
    }
}
