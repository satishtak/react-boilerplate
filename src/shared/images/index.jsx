import PropTypes from 'prop-types';

// import noDocument from '../../assets/images/Document-image.png';

const Images = ({ imageType, alt }) => {
  switch (imageType) {
    // case 'NO-DOCUMENT':
    //   return <img src={noDocument} alt={alt} />;

    default:
      break;
  }
};

Images.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.string,
};

Images.defaultProps = {
  type: '',
  classes: '',
};

export default Images;
