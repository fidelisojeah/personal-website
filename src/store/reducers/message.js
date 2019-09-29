import { messageConstants } from '<constants>';

export function showMessage(data) {
    return {
        type: messageConstants.SHOW_MESSAGE,
        data: {
            message: data.message,
            type: data.type
        }
    };
}

export function hideMessage(data) {
    return {
        type: messageConstants.HIDE_MESSAGE
    };
}

export default function reduxMessage(state = {
    text: '',
    type: null,
    isOpen: false
}, action) {
    switch (action.type) {
        case messageConstants.SHOW_MESSAGE: {
            return {
                ...state,
                isOpen: true,
                text: action.data.message,
                type: action.data.type
            };
        }
        case messageConstants.HIDE_MESSAGE: {
            return {
                ...state,
                isOpen: false,
                text: '',
                type: ''
            };
        }
        default:
            return state;
    }
}
