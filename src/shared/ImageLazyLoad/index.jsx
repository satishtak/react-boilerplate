import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DefaultLoader from '../components/PageLoading';

const IMAGE_FADE_IN_CLASS = 'iron-image--fade-in';

const ImageLazyLoad = ({ alt, src }) => {
  const [imageLoadFinishedClass, setImageLoadFinishedClass] = useState('');

  const imageLoadHandler = () => {
    setImageLoadFinishedClass(IMAGE_FADE_IN_CLASS);
  };

  return (
    <div
      className={`iron-image__container ${
        imageLoadFinishedClass === '' ? 'userCenterLoader userLoaderList' : ''
      }`}
    >
      {imageLoadFinishedClass === '' ? <DefaultLoader /> : <></>}
      <img
        className={`iron-image ${imageLoadFinishedClass}`}
        alt={alt}
        src={src}
        onLoad={imageLoadHandler}
      />
    </div>
  );
};

ImageLazyLoad.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

ImageLazyLoad.defaultProps = {
  alt: '',
  src: '',
};

export default ImageLazyLoad;
