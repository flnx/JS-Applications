export const getUser = () => {
  return JSON.parse(sessionStorage.getItem('userData'));
};

export const clearUser = () => {
  sessionStorage.removeItem('userData');
};

export const setUser = (user) => {
  sessionStorage.setItem('userData', JSON.stringify(user));
};
