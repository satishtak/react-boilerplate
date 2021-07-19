import React from 'react'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

function Dashboard({ t }) {
  return (
    <div>
      Dashboard - {t`application-title`}
      <ul>
        <li>
          I18 Integrated
        </li>
        <li>
          Base layout setup
        </li>
        <li>
          Axios for third party api calling
        </li>
        <li>
          Proxy Middle ware setup
        </li>
        <li>
          React Redux Setup
        </li>
        <li>
          Icons setup
        </li>
        <li>
          multiple Environment Setup
        </li>
      </ul>
    </div>
  )
}

export default withTranslation()(connect(null, null)(Dashboard));
