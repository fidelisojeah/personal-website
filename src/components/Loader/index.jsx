import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LoaderWrapper } from './styles';


function Loader({ isLoading }) {
    if (!isLoading) return null;
    return (
        <LoaderWrapper />
    );
}

Loader.defaultProps = {
    isLoading: false
};

Loader.propTypes = {
    isLoading: PropTypes.bool
};

function mapStatesToProps(state) {
    return { isLoading: state.loader.requests.length > 0 };
}

export default connect(mapStatesToProps)(React.memo(Loader));
