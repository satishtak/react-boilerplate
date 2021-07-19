import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { DASHBOARD } from '../../../constants/paths';
import PageLoading from '../PageLoading';

const OpenRoute = ({
  component: Component,
  isUserLoggedIn,
  isLoading,
  user,
  wrapLayout,
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
              {user !== null ? (
                <Redirect
                  to={{
                    pathname: DASHBOARD,
                    state: { from: props.location },
                  }}
                />
              ) : (
                <Component {...props} />
              )}
            </>
          )}
        </>
      )}
    />
  );
};

const mapStateToProps = function ({ auth }) {
  return {
    isUserLoggedIn: !!auth.user,
    isLoading: auth.loading,
    user: auth.user,
  };
};

export default connect(mapStateToProps)(OpenRoute);
