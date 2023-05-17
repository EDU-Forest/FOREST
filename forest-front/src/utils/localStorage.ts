export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  return value && JSON.parse(value);
};

export const setLocalStorage = (key: string, value: string) => {
  if (!value) return;

  const toJson = JSON.stringify(value);

  localStorage.setItem(key, toJson);
};

export const removeItemLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
