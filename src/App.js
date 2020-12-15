import React, { useState, useEffect } from 'react';
import Picker from './components/Picker';
import Footer from './components/Footer';

const App = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const maxWidth = 600;
  const maxHeight = 400;

  /**
   * Lasketaan Pickerin koko aina kun App re-renderöidään.
   * Pickerille lasketaan koko, joka mahtuu sen hetkiseen näyttöön.
   */
  const ratio = maxWidth / maxHeight;
  let width, height;

  if (innerWidth > maxWidth) {
    width = maxWidth;
    height = maxHeight;
  } else {
    width = innerWidth;
    height = innerWidth / ratio;
  }

  useEffect(() => {
    const resize = () => {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div>
      <div className='header'>
        <h1>Color picker</h1>
      </div>
      <Picker width={width} height={height} />
      <Footer />
    </div>
  );
};

export default App;