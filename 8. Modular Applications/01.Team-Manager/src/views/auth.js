export const authCheck = () => {
  const session = JSON.parse(sessionStorage.getItem('userData'));

  if (session) {
    return session;
  }

  return false;
};