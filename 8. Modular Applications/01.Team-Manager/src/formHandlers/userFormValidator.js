export const inputValidator = (command, email, password, validateEmail, username, repass) => {
  let error;

  if (email.length < 3) {
    error = 'Email adress must contain least 3 characters';
  } else if (!validateEmail) {
    error = 'Please enter a valid email address';
  } else if (command == 'reg') {
    if (username.length < 3) {
      error = 'Username must be at least 3 characters';
    } else if (password !== repass) {
      error = "Passwords don't match";
    }
  }

  if (password.length < 6) {
    error = 'Password must contain at least 6 characters';
  }

  return error;
};
