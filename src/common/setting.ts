const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const kebab = (str: string) => {
  return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

const acronym = (str: string, length = 2) => {
  const matches = str.match(/\b(\w)/g);
  if (matches) {
    if (matches.length > length) {
      return `${matches[0]}${matches[1]}`;
    } else return matches.join("");
  } else return "";
};

const toggleFullScreen = () => {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen;
  const cancelFullScreen = doc.exitFullscreen;

  if (!doc.fullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
};

export { randomElement, toggleFullScreen, kebab, acronym };
