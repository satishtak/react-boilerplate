import React from 'react';
import { withTranslation } from 'react-i18next';

const DataLoadError = ({ t }) => {
  return <div>{t`data-load-error`}</div>;
};

export default withTranslation()(DataLoadError);
