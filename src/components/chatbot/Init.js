import React, { useState, useEffect } from 'react';

export default function Init({ steps, triggerNextStep, cookies }) {
  const [tokenExist, setTokenExist] = useState(false);

  useEffect(() => {
    if (cookies.access_token) {
      console.log(cookies.access_token);
      setTokenExist(true);
      triggerNextStep({ trigger: 'home' });
    } else {
      triggerNextStep({ trigger: 'q-login-reg' });
    }
  }, []);
  let StatusMessage = null;
  if (tokenExist) {
    StatusMessage = <p>We have your token</p>;
  } else if (!tokenExist) {
    StatusMessage = <p>We dont have your token yet</p>;
  }
  return (
    <>
      <div> {StatusMessage} </div>
    </>
  );
}
