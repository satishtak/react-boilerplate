/* eslint-disable no-useless-return */
import axios from 'axios';
import get from 'lodash.get';
import ERROR_CODES from './errorCodes';
import displayNotification from '../shared/notifications';

import { CLIENT_ID } from '../constants/common';

class BrowserHttpClient {
  onGoingAPICount = 0;

  isLoaderStarted = false;

  async callAPI({
    url,
    method = 'GET',
    useLoader = true,
    showErrorMessage = true,
    errorMessage,
    successMessage,
    hideErrorMessage,
    data,
    contentType = 'application/json',
    query = {},
    xActiveUserId,
    displayMessageDuration,
    customErrorMessage,
    stopShowErrorMsg = false,
    customErrorCodeCheck = '',
  }) {
    this.showSessionTimeOutNotification = true;
    const fullUrl = `${process.env.REACT_APP_API_URL}${url}`;
    try {
      this.handleLoader({ increment: true, useLoader });
      const headers = {
        'Content-Type': `${contentType}`,
      };
      headers['Client-Id'] = CLIENT_ID;
      if (xActiveUserId) {
        headers['x-active-user-id'] = xActiveUserId;
      }
      // headers["x-active-user-id"] = "5fd3425b6a64450011314223";
      const returnData = await axios({
        data,
        headers,
        url: `${fullUrl}`,
        method,
        params: query,
      });
      if (
        returnData.data.Status === 'success' ||
        returnData.status === 204 ||
        returnData.status === 200
      ) {
        if (successMessage) {
          this.handleNotification({
            message: successMessage,
            notificationType: 'success',
            displayMessageDuration,
          });
        }
        return returnData.data.Data || returnData.status;
      }
      throw returnData;
      // throw returnData && returnData.data && returnData.data.error;
    } catch (e) {
      if (stopShowErrorMsg) {
        return e.response.data;
      }
      if (
        customErrorCodeCheck !== '' &&
        e.response.data.ErrorCode !== undefined &&
        customErrorCodeCheck === e.response.data.ErrorCode
      ) {
        return e.response.data;
      }

      this.handleError(e, errorMessage, showErrorMessage, hideErrorMessage, customErrorMessage);
      throw e;
    } finally {
      this.handleLoader({ increment: false, useLoader });
    }
  }

  handleError(e, defaultMessage, showErrorMessage, hideErrorMessage, customErrorMessage) {
    const errorResponse = e.response;

    if (
      customErrorMessage &&
      get(errorResponse, 'data.ErrorCode') &&
      errorResponse.data.ErrorCode === 'InactiveAccount'
    ) {
      this.handleNotification({
        message: customErrorMessage,
        notificationType: 'error',
      });
      return;
    }

    const errorMessage =
      (errorResponse && errorResponse.data && errorResponse.data.Error) ||
      (e && e.message) ||
      defaultMessage ||
      'Unexpected error occurred.';

    const errorCode = get(errorResponse, 'data.ErrorCode');
    if (errorResponse && errorResponse.status === 413) {
      this.handleNotification({
        message: 'Request body size is too large',
        notificationType: 'error',
      });
    } else if (errorMessage === 'Network Error') {
      this.handleNotification({
        message: 'Network connectivity lost',
        notificationType: 'error',
      });
    } else if (errorMessage === 'Request aborted') {
      return;
    } else if (errorResponse && errorResponse.status === 503 && process.env.ENV === 'production') {
      return;
    } else if (
      (errorCode === ERROR_CODES.AuthorizationFailed ||
        errorCode === ERROR_CODES.AuthorizationKeyExpired) &&
      this.showSessionTimeOutNotification
    ) {
      this.showSessionTimeOutNotification = false;
    } else if (
      errorCode &&
      !(
        errorCode === ERROR_CODES.AuthorizationFailed ||
        errorCode === ERROR_CODES.AuthorizationKeyExpired
      )
    ) {
      if (hideErrorMessage) {
        return;
      }
      if (showErrorMessage) {
        let errorStr = '';
        try {
          const errorArr = JSON.parse(errorMessage);
          if (errorArr.length > 0) {
            errorStr = errorArr.join(',');
          } else {
            errorStr = errorMessage;
          }
        } catch (error) {
          errorStr = errorMessage;
        }
        this.handleNotification({
          message: errorStr,
          notificationType: 'error',
        });
      }
    } else if (!hideErrorMessage) {
      let errorStr = '';
      try {
        const errorArr = JSON.parse(errorMessage);
        if (errorArr.length > 0) {
          errorStr = errorArr.join(',');
        } else {
          errorStr = errorMessage;
        }
      } catch (error) {
        errorStr = errorMessage;
      }
      this.handleNotification({
        message: errorStr,
        notificationType: 'error',
      });
    }
  }

  handleNotification = ({ message, notificationType = 'success', displayMessageDuration }) => {
    if (!message) return;
    displayNotification(notificationType, message, displayMessageDuration);
  };

  handleLoader({ increment, useLoader }) {
    if (!useLoader) {
      return;
    }
    if (increment) {
      this.onGoingAPICount++;
    } else {
      this.onGoingAPICount--;
    }
    if (this.onGoingAPICount > 0 && !this.isLoaderStarted) {
      this.isLoaderStarted = true;
    } else if (this.onGoingAPICount <= 0 && this.isLoaderStarted) {
      this.isLoaderStarted = false;
    }
  }
}

const httpClient = new BrowserHttpClient();

export default httpClient;
