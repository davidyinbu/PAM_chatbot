import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import UserRegister from './UserRegister';
import UserLogin from './UserLogin';
import Init from './Init';
import { emailValidator } from './validators/validators';
import { useCookies } from 'react-cookie';
import GetAllTeams from './getRequest/getAllTeams';

export default function Rules() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const rules = [
    // all the logical steps
    {
      id: 'greeting',
      message: 'Hello',
      trigger: 'init'
    },
    {
      // detect login or not
      id: 'init',
      component: <Init cookies={cookies} />, // direct to login-reg or login-success
      delay: 8
    },

    // login section
    {
      id: 'login-error',
      message: 'Invalid user name or password, please try again',
      trigger: 'o-login-reg'
    },
    {
      id: 'login-success',
      message: 'You have successfully logged in!',
      trigger: 'home' // TODO: link to the another page
    },
    {
      id: 'home',
      message: 'This is the home page after you login',
      trigger: 'getAllTeams'
    },
    {
      id: 'reg-error',
      message: 'Faild to register the account, please try again',
      trigger: 'o-login-reg'
    },
    {
      id: 'reg-success',
      message: 'Now you can choose to login',
      trigger: 'o-login-reg'
    },
    {
      id: 'q-login-reg',
      message: 'Please Login or Register first',
      trigger: 'o-login-reg'
    },
    {
      id: 'o-login-reg',
      options: [
        { value: 1, label: 'Log in', trigger: 'login' },
        { value: 2, label: 'Sign up', trigger: 'register' }
      ]
    },
    {
      id: 'login',
      message: 'You choose to login, we need some info from you first',
      trigger: 'q-email-log'
    },
    {
      id: 'q-email-log',
      message: 'what is your email?',
      trigger: 'emailLog'
    },
    {
      id: 'emailLog',
      user: true,
      validator: emailValidator,
      trigger: 'q-password-log'
    },
    {
      id: 'q-password-log',
      message: 'what is your password?',
      trigger: 'passwordLog'
    },
    {
      id: 'passwordLog',
      user: true,
      trigger: 'submit-user-info-log'
    },
    {
      id: 'submit-user-info-log',
      component: <UserLogin cookies={cookies} setCookie={setCookie} />,
      delay: 8,
      waitAction: true
    },
    {
      id: 'register',
      message: 'You choose to sign up, we need some info from you first',
      trigger: 'q-email-reg'
    },
    {
      id: 'q-email-reg',
      message: 'what is your email?',
      trigger: 'emailReg'
    },
    {
      id: 'emailReg',
      user: true,
      trigger: 'q-password-reg'
    },
    {
      id: 'q-password-reg',
      message: 'what is your password?',
      trigger: 'passowrdReg'
    },
    {
      id: 'passowrdReg',
      user: true,
      trigger: 'submit-user-info-reg'
    },
    {
      id: 'submit-user-info-reg',
      component: <UserRegister />,
      delay: 8,
      waitAction: true
    },
    // home page route
    {
      id: 'home-route',
      options: [
        { value: 1, label: 'get all the teams', trigger: 'getAllTeams' }
        //{ value: 2, label: '', trigger: 'register' }
      ]
    },
    // team section
    {
      id: 'getAllTeams',
      component: <GetAllTeams cookies={cookies} />,
      delay: 8,
      end: true
    }
  ];

  return <ChatBot steps={rules} />;
}
