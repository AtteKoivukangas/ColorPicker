import React from 'react';

const ImageUpload = ({ onChange }) => (
  <input
    type='file'
    accept='image/*'
    onChange={onChange}
    className='m-1'
  />
);

export default ImageUpload;