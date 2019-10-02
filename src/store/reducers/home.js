import { homeConstants } from '<constants>';


const INITIALSTATE = {
    social: [
        {
            id: 1,
            icon: 'github',
            url: 'https://github.com/fidelisojeah'
        },
        {
            id: 2,
            icon: 'linkedin',
            url: 'https://www.linkedin.com/in/fidelisojeahjr'
        },
        {
            id: 3,
            icon: 'stackoverflow',
            url: 'https://stackoverflow.com/users/10868273/delis'
        }
    ],
    resume: {
        link: 'https://firebasestorage.googleapis.com/v0/b/delis-xyz-52b13.appspot.com/o/fidelisojeah.pdf?alt=media&token=8189ae80-6db1-43cb-9723-54ac319fd506'
    }
};

export function loadHomePageFailure(error) {
    return {
        type: homeConstants.HOME_PAGE_REQUEST_FAILURE,
        data: error
    };
}

export function loadHomePage() {
    return {
        type: homeConstants.HOME_PAGE_REQUEST,
    };
}

export function loadHomePageSuccess(data) {
    return {
        type: homeConstants.HOME_PAGE_REQUEST_SUCCESS,
        data
    };
}


export default function homePage(state = INITIALSTATE, action) {
    switch (action.type) {
        case homeConstants.HOME_PAGE_REQUEST_SUCCESS:
            return {
                ...state,
                social: action.data.social.social || state.social,
                resume: {
                    link: action.data.resume.link || state.resume.link
                }
            };
        case homeConstants.HOME_PAGE_REQUEST_FAILURE:
            return state;
        default:
            return state;
    }
}
