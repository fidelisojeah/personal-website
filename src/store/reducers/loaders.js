const INITIAL_STATE = {
    requests: []
};

export default function Loader(state = INITIAL_STATE, action) {
    if (typeof action.type !== 'string') {
        return state;
    }

    const actionType = action.type.substring(0, action.type.length - 8) || '';

    if (action.type.endsWith('/REQUEST')) {
        return {
            ...state,
            requests: [...state.requests, actionType]
        };
    }
    if (action.type.endsWith('/SUCCESS') || action.type.endsWith('/FAILURE')) {
        const firstIndex = state.requests.indexOf(actionType);
        return {
            ...state,
            requests: [...state.requests.filter((_request, index) => index !== firstIndex)]
        };
    }
    return state;
}
