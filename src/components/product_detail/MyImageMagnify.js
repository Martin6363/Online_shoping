import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import '../../assets/styles/MyImageMagnify.scss';

const MyImageMagnify = ({ detail }) => {
  const smallImage = {
    alt: 'product',
    isFluidWidth: false,
    width: 660,
    height: 530,
    src: detail ? detail.image : '',
  };

  const largeImage = {
    src: detail ? detail.image : '',
    width: 1200,
    height: 1000,
  };

  const customStyle = {
    width: '300px',
    height: '300px',
  };

  return (
    <ReactImageMagnify
      {...{
        smallImage,
        largeImage,
        imageClassName: 'hovers_img',
        enlargedImagePosition: 'over',
        isHintEnabled: true,
        shouldHideHintAfterFirstActivation: false,
        shouldUsePositiveSpaceLens: true,
        enlargedImageClassName: 'hovers_img',
        fadeDurationInMs: 250,
        hoverDelayInMs: 50,
        hoverOffDelayInMs: 50,
      }}
      enlargedImageContainerStyle={customStyle}
    />
  );
};

export default MyImageMagnify;
