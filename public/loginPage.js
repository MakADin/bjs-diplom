"use strict";
const userForm = new UserForm();

const handleLoginSubmit = function (data) {
  // const result = ApiConnector.login(data, response => console.log(response));
  const result = ApiConnector.login(data, userForm.loginFormAction);

}

userForm.loginFormCallback = data => ApiConnector.login(data, response => {
  if (response.success) {
    location.reload();
  } else {
    // userForm.setLoginErrorMessage(response.error);
    this.setLoginErrorMessage(response.error);
  }
});