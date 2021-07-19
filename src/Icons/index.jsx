import PropTypes from 'prop-types';
import IcomoonReact from 'icomoon-react';

import iconSet from '../selection.json';

const FontIcons = ({ type, classes, onClick }) => (
  <IcomoonReact iconSet={iconSet} className={classes} icon={type} onClick={onClick} />
);

FontIcons.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.string,
};

FontIcons.defaultProps = {
  type: '',
  classes: '',
};

export default FontIcons;
