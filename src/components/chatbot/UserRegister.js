import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserRegister({ steps, triggerNextStep }) {
  const { emailReg, passowrdReg } = steps;
  const [regStatus, setRegStatus] = useState(false);

  useEffect(() => {
    const userObject = {
      email: emailReg.value,
      password: passowrdReg.value
    };
    axios
      .post(`http://127.0.0.1:5000/api/v1/user/register`, userObject)
      .then((res) => {
        console.log(res.status, res.data); // log the status code and response data
        if (res.status === 200 || res.status === 201) {
          setRegStatus(true);
          triggerNextStep({ trigger: 'reg-success' }); // set the trigger for success login step
        }
      })
      .catch(function(error) {
        console.log(error);
        setRegStatus('error'); // log the error if occur
        triggerNextStep({ trigger: 'reg-error' });
      });
  }, []);

  // output status
  let RegStatusMessage = null;
  if (regStatus) {
    RegStatusMessage = <p>You have successfully creat the account!</p>;
  } else if (!regStatus) {
    RegStatusMessage = <p>Error occur, please try again</p>;
  }

  return <>{RegStatusMessage}</>;
}
