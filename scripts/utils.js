export const writeToLocalStorage = (setting, state) => {
  window.localStorage.setItem(setting, state);

  console.log("localstorage updated", `${localStorage.getItem(setting)}`);
};

export const readFromLocalStorage = (setting) => {
  console.log("reading from local storage");
  return JSON.parse(window.localStorage.getItem(setting));
};
