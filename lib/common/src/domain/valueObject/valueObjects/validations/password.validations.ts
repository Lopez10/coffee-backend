export const passwordValidations = {
  minLength: (password: string, minLength: number): boolean => {
    return password.length >= minLength;
  },

  maxLength: (password: string, maxLength: number): boolean => {
    return password.length < maxLength;
  },

  haveUppercaseAndLowercase: (password: string): boolean => {
    let uppercase = false;
    let lowercase = false;

    for (let index = 0; index < password.length; index++) {
      if (
        !uppercase &&
        password.charAt(index) === password.charAt(index).toUpperCase()
      ) {
        uppercase = true;
      }

      if (
        !lowercase &&
        password.charAt(index) === password.charAt(index).toLowerCase()
      ) {
        lowercase = true;
      }

      if (uppercase && lowercase) {
        return true;
      }
    }
    return false;
  },

  haveDigits: (password: string): boolean => {
    return /\d/.test(password);
  },
};
