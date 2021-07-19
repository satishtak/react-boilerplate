import httpClient from './httpClient';
import {
  userSection,
} from '../constants/apiurl';

// these are all dummy function which are used as reference

export const getSubscriptionDetails = (userId) =>
  httpClient.callAPI({
    url: `${userSection}subscription-detail/get`,
    xActiveUserId: userId,
  });

export const updateProfile = (data, userId, successMessage) =>
  httpClient.callAPI({
    url: `${userSection}update-user-info/${userId}`,
    method: 'POST',
    data,
    successMessage,
  });

export const updateNotificationPreference = (data, userId) =>
  httpClient.callAPI({
    url: `${userSection}user/notification-preferences/edit`,
    method: 'PUT',
    data,
    xActiveUserId: userId,
    successMessage: 'Your notification preferences have been updated',
  });

export const removeProfileImage = (userId) =>
  httpClient.callAPI({
    url: `${userSection}user/remove-profile-image`,
    xActiveUserId: userId,
    method: 'DELETE',
    data: {},
  });
