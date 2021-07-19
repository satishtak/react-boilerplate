/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';

import BaseLayout from './shared/components/BaseLayout';
import i18n from './i18n';
import ProtectedRoute from './shared/components/ProtectedRoute';
import OpenRoute from './shared/components/OpenRoute';

import {
  SIGN_IN,
  DASHBOARD,
} from './constants/paths';
import PageLoading from './shared/components/PageLoading';

const SignIn = lazy(() => import('./modules/Sign-in'));
const Dashboard = lazy(() => import('./modules/Dashboard'));
const NotFound = lazy(() => import('./shared/components/BaseLayout/notFound'));

function App({
  isUserLoggedIn,
  isLoading,
}) {
  return (
    <Suspense
      fallback={
        <div className="loadercenter">
          <PageLoading />
        </div>
      }
    >
      <Router>
        <I18nextProvider i18n={i18n}>
          <Switch>
            <OpenRoute
              path={SIGN_IN}
              component={SignIn}
            />

            <ProtectedRoute
              path={DASHBOARD}
              component={Dashboard}
              wrapLayout={true}
            />
            
            <Route>
              <>
                {!isLoading ? (
                  <>
                    {isUserLoggedIn ? (
                      <BaseLayout notFound={true}>
                        <NotFound />
                      </BaseLayout>
                    ) : (
                      <>
                        <NotFound />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            </Route>
          </Switch>
        </I18nextProvider>
      </Router>
    </Suspense>
  );
}

const mapStateToProps = function ({ auth }) {
  return {
    isUserLoggedIn: !!auth.user,
    isLoading: auth.loading,
  };
};

export default connect(mapStateToProps, null)(App);
