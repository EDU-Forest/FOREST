export const getSessionStorage = (key: string) => {
  const value = sessionStorage.getItem(key);

  return value && JSON.parse(value);
};

export const setSessionStorage = (key: string, value: number) => {
  if (!value) return;

  const toJson = JSON.stringify(value);

  sessionStorage.setItem(key, toJson);
};
