import React, { useState, useEffect, createRef } from 'react';
import ImageUpload from './ImageUpload';
import ColorField from './ColorField';
import { imageFromFile } from '../utils/algorithm';

const Picker = ({ width, height }) => {
  const [image, setImage] = useState(null);
  const canvas = createRef();

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    if (!image) {
      canvas.current.width = width;
      canvas.current.height = height;
      return;
    }

    const ratio = image.width / image.height;
    let newWidth = width;
    let newHeight = newWidth / ratio;

    if (newHeight > height) {
      newHeight = height;
      newWidth = newHeight * ratio;
    }

    canvas.current.width = newWidth;
    canvas.current.height = newHeight;
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
  }, [image, width, height, canvas]);

  const handleUpload = async ev => {
    const file = ev.target.files[0];

    setImage(file
      ? await imageFromFile(file)
      : null
    );
  };

  return (
    <div className="text-center">
      <canvas
        width={width}
        height={height}
        ref={canvas}
        className='block picker-canvas mx-auto'
      />
      <ImageUpload onChange={handleUpload} />
      <ColorField canvasRef={canvas} />
    </div>
  );
};

export default Picker;