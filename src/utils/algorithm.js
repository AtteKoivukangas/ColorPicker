/**
 * Lataa kuvan asynkronisesti
 * 
 * @param {string} url Ladattavan kuvan url
 * @return {object} Image -objekti
 */

const loadImage = url => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Palauttaa File objektin sisältämän kuvan Image objektina
 * 
 * @param {object} file Tiedosto, josta kuva haetaan
 * @return {object} Image -objekti
*/

export const imageFromFile = async file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async event => {
      const img = await loadImage(event.target.result);
      resolve(img);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Laskee reactDOM elementin sijainnin näytöllä
 * 
 * @param {object} obj reactDOM elementti
 * @return {object} koordinaatit elementin sijainnista näytöllä
 */

export const calcPos = el => {
  if (!el.offsetParent) return;

  let left = 0, top = 0;
  do {
    left += el.offsetLeft;
    top += el.offsetTop;
  } while (el === el.offsetParent)

  return { x: left, y: top };
}

/**
 * Muuntaa rgb -> hex
 * 
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 * @return {string} rgb muutettuna hex -koodiksi
 */

export const rgbToHex = (r, g, b) => {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + ('000000' + hex).slice(-6);
};

/**
 * Palauttaa arvon, joka on sijoitettu annetulle lukuvälille
 * 
 * @param {number} val arvo joka sijoitetaan lukuvälille
 * @param {number} min lukuvälin alku
 * @param {number} max lukuvälin loppu
 * @return {number} arvo väliltä [min, max]
 */

export const clamp = (val, min, max) => {
  return val < min ? min : val > max ? max : val;
};