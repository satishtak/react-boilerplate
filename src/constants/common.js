import FontIcons from "../Icons/index";

export const headerDropdownItemsAgent = [
  { label: "Profile", key: "profile", icon: <FontIcons type="profile-icn" /> },
  {
    label: "My Subscription",
    key: "mySubscription",
    icon: <FontIcons type="my_subscription-icn" />,
  },
  {
    label: "Change Password",
    key: "changePassword",
    icon: <FontIcons type="password-icn" />,
  },
  {
    label: "Notification Preferences",
    key: "notificationPreferences",
    icon: <FontIcons type="notification-icn" />,
  },
];

export const bucketBaseUrl = process.env.REACT_APP_CDN_URL;
export const currencySign = "$";

export const premiumTimeFrameArr = (t) => [
  { name: t`finance.insurance.monthly`, value: "monthly" },
  { name: t`finance.insurance.biMonthly`, value: "biMonthly" },
  { name: t`finance.insurance.quarterly`, value: "quarterly" },
  { name: t`finance.insurance.biAnnualy`, value: "biAnnualy" },
  { name: t`finance.insurance.annually`, value: "annually" },
];
