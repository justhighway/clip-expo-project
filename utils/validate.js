function validateUser(values) {
  const errors = {
    username: "",
    password: "",
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username)) {
    errors.username = "올바른 이메일 형식이 아닙니다.";
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  return errors;
}

function validateSignIn(values) {
  return validateUser(values);
}

function validateSignUp(values) {
  const errors = validateUser(values);
  const signupErrors = { ...errors, passwordConfirm: "" };

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  }

  return signupErrors;
}

function validateAddItem(values) {
  const errors = {
    itemName: "",
    itemPrice: "",
    itemDescription: "",
  };

  if (values.itemName.trim() === "") {
    errors.itemName = "물건의 이름은 1~30자 이내로 입력해주세요.";
  }
  if (values.itemPrice.trim() === "") {
    errors.itemPrice = "물건의 가격은 필수입니다.";
  }

  return errors;
}

export { validateAddItem, validateSignIn, validateSignUp, validateUser };
