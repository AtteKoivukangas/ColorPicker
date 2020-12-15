import React, { useRef, useEffect, useState } from 'react';
import { calcPos, clamp, rgbToHex } from '../utils/algorithm';

const ColorField = ({ canvasRef }) => {
  const [selectedHex, setSelectedHex] = useState('#ffffff');
  const colorCanvas = useRef();

  const buildColorCanvas = data => {
    const ctx = colorCanvas.current.getContext('2d');

    ctx.beginPath();
    ctx.clearRect(0, 0, colorCanvas.current.width, colorCanvas.current.height);
    const len = data.length;
    for (let i = 0; i < len; i += 4) {
      let x = ((i / 4) % 11) * 10;
      let y = Math.trunc(i / 4 / 11) * 10;

      ctx.fillStyle = `rgba(
        ${ data[i] },
        ${ data[i+1] },
        ${ data[i+2] },
        ${ data[i+3]/255 }
      )`;

      ctx.fillRect(x, y, 10, 10);
    }

    ctx.strokeRect(50, 50, 10, 10);
    ctx.closePath();
  }

  useEffect(() => {
    const ref = canvasRef.current;
    
    const handleMousemove = ev => {
      const pos = calcPos(ref);
      let x = clamp(ev.pageX - pos.x, 6, ref.width - 5);
      let y = clamp(ev.pageY - pos.y, 6, ref.height - 5);

      buildColorCanvas(
        ref.getContext('2d').getImageData(x-6, y-6, 11, 11).data
      );
    }

    const handleClick = () => {
      const d = colorCanvas.current
        .getContext('2d')
        .getImageData(55, 55, 1, 1).data;

      for (let i = 0; i < 4; i++) {
        if (d[i]) return setSelectedHex(
          rgbToHex(d[0], d[1], d[2], d[3])
        );
      }

      setSelectedHex('#ffffff');
    }

    ref.addEventListener('mousemove', handleMousemove);
    ref.addEventListener('click', handleClick)

    return () => {
      ref.removeEventListener('mousemove', handleMousemove);
      ref.removeEventListener('click', handleClick);
    }
  }, [canvasRef]);

  return (
    <div id='color-field' className="mx-auto">
      <code id='hex-box' className="text-dark">
        <b>{selectedHex}</b>
        <span style={{ backgroundColor: selectedHex }} />
      </code>
      <canvas width='110' height='110' ref={colorCanvas} />
    </div>
  );
};

export default ColorField;