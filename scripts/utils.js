export const writeToLocalStorage = (setting, state) => {
  window.localStorage.setItem(setting, JSON.stringify(state));
};

export const readFromLocalStorage = (setting) => {
  return JSON.parse(window.localStorage.getItem(setting));
};
