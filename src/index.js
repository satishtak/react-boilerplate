import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './redux/reducers';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import PageLoading from './shared/components/PageLoading';

const store = createStore(rootReducer, applyMiddleware(thunk));

const LazyApp = lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <div className="loadercenter">
          <PageLoading />
        </div>
      }
    >
      <LazyApp />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
