import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as dayjs from 'dayjs';
import { withTranslation } from 'react-i18next';

import BaseLayout from '../../../shared/components/BaseLayout';
import { logoutUser } from '../../../redux/actions';
import PageLoading from '../PageLoading';
import {
  SIGN_IN,
} from '../../../constants/paths';
var isToday = require('dayjs/plugin/isToday');

dayjs.extend(isToday);

const ProtectedRoute = ({
  t,
  component: Component,
  isUserLoggedIn,
  isLoading,
  isForceReset,
  user,
  wrapLayout,
  userType,
  doUserLogout,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {isLoading ? (
            <div className="loadercenter">
              <PageLoading />
            </div>
          ) : (
            <>
              {isUserLoggedIn ? (
                <>
                  {wrapLayout ? (
                    <BaseLayout>
                      <Component {...props} />
                    </BaseLayout>
                  ) : (
                    <>
                      <Component {...props} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <Redirect
                    to={{
                      pathname: SIGN_IN,
                      state: { from: props.location },
                    }}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    doUserLogout: (args) => dispatch(logoutUser(args)),
  };
}

const mapStateToProps = function ({ auth }) {
  return {
    isUserLoggedIn: !!auth.user,
    isLoading: auth.loading,
    user: auth.user,
    isForceReset: auth.isForceReset,
  };
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute));
