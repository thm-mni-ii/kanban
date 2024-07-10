// colorHelper.js
export function getColorFromId(id) {
    const salt = 12345;
    const hash = hashString(id.toString() + salt.toString());
    return `#${hash.slice(0, 6)}`;
  }
  
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    let color = ((hash >>> 0) & 0xFFFFFF).toString(16);
    while (color.length < 6) {
      color = '0' + color;
    }
    return color;
  }