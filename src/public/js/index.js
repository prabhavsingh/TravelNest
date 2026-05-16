/*eslint-disable*/

import 'core-js/stable';
import 'regenerator-runtime';

import { forgotPassword, login, logout, resetPassword, signup } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe.js';
import { displayMap } from './map.js';

const mapTiler = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const signupForm = document.querySelector('.form--signup');
const forgotPasswordForm = document.querySelector('.form--forgot--password');
const resetPasswordForm = document.querySelector('.form--reset--password');

if (mapTiler) {
  const locations = JSON.parse(mapTiler.dataset.locations);
  displayMap(locations);
}
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (forgotPasswordForm)
  forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resetBtn = document.querySelector('.btn--reset');
    resetBtn.disabled = true;
    resetBtn.textContent = 'Processing...';
    const email = document.getElementById('email').value;
    try {
      await forgotPassword(email);
      let time = 60;
      const countdown = setInterval(() => {
        time--;
        document.querySelector(
          '.btn--reset',
        ).textContent = `Try Again in ${time} sec`;
        if (time === 0) {
          clearInterval(countdown);
          resetBtn.disabled = false;
          resetBtn.textContent = `Reset Password`;
        }
      }, 1000);
    } catch (error) {
      resetBtn.disabled = false;
      resetBtn.textContent = `Reset Password`;
    }
  });

if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resetBtn = document.querySelector('.btn--reset');
    resetBtn.textContent = 'Updating...';
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const resetToken = resetBtn.dataset.resetToken;
    try {
      await resetPassword(password, passwordConfirm, resetToken);
      resetBtn.textContent = `Done`;
    } catch (error) {
      resetBtn.disabled = false;
      resetBtn.textContent = 'Save Password';
    }
  });

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log('form', [...form]);
    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
