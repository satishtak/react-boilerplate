import React from 'react';
import PropTypes from 'prop-types';
import DefaultLoader from './DefaultLoader';

function PageLoading({ hasModal }) {
  return (
    <div>
      <DefaultLoader />
    </div>
  );
}

PageLoading.propTypes = {
  hasModal: PropTypes.bool,
};

PageLoading.defaultProps = {
  hasModal: false,
};

export default PageLoading;
