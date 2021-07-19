import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const NotFound = ({ t }) => {
  return (
    <div>
      Not Found
    </div>
  );
};

const mapStateToProps = function ({ auth }) {
  return {
    isUserLoggedIn: !!auth.user,
    isLoading: auth.loading,
    user: auth.user,
  };
};

export default withTranslation()(connect(mapStateToProps, null)(NotFound));
