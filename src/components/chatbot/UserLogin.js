import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from './SetAuthToken';

export default function UserLogin({
  steps,
  triggerNextStep,
  cookies,
  setCookie
}) {
  const { emailLog, passwordLog } = steps;
  const [loginStatus, setLoginStatus] = useState(false); //init false not log in

  useEffect(() => {
    const userObject = {
      email: emailLog.value,
      password: passwordLog.value
    };

    console.log(steps);
    axios
      .post(`http://127.0.0.1:5000/api/v1/user/login`, userObject)
      .then((res) => {
        console.log(res.status, res.data); // log the status code and response data
        if (res.status === 200 || res.status === 201) {
          const token = res.data.token;
          //localStorage.setItem('token', token); //
          setCookie('access_token', token);
          //setAuthToken(cookies.access_token); // set token to axios common header

          setLoginStatus(true);
          triggerNextStep({ trigger: 'login-success' }); // set the trigger for success login step
        }
      })
      .catch(function(error) {
        console.log(error);
        setLoginStatus(false); // log the error if occur
        triggerNextStep({ trigger: 'login-error' });
      });
  }, []);

  // output status
  let loginStatusMessage = null;
  if (loginStatus) {
    loginStatusMessage = <p>You have successfully logged in!</p>;
  } else if (!loginStatus) {
    loginStatusMessage = <p>Error occur, please try again</p>;
  }

  return <>{loginStatusMessage}</>;
}
