const registerForm = document.createElement('form');
registerForm.setAttribute('method', 'POST');
registerForm.setAttribute('action', '/auth/register');
registerForm.setAttribute('id', 'registerForm');

const emailInputRegister = document.createElement('input');
emailInputRegister.setAttribute('type', 'email');
emailInputRegister.setAttribute('name', 'email');
emailInputRegister.setAttribute('placeholder', 'Email');
emailInputRegister.setAttribute('required', 'true');

const passwordInputRegister = document.createElement('input');
passwordInputRegister.setAttribute('type', 'password');
passwordInputRegister.setAttribute('name', 'password');
passwordInputRegister.setAttribute('placeholder', 'Password');
passwordInputRegister.setAttribute('required', 'true');

const submitButtonRegister = document.createElement('button');
submitButtonRegister.setAttribute('type', 'submit');
submitButtonRegister.textContent = 'Register';

registerForm.appendChild(emailInputRegister);
registerForm.appendChild(passwordInputRegister);
registerForm.appendChild(submitButtonRegister);

document.body.appendChild(registerForm);

const urlRegister = 'http://localhost:3000/auth/register';

submitButtonRegister.addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInputRegister.value;
  const password = passwordInputRegister.value;
  fetch(urlRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

const loginForm = document.createElement('form');
loginForm.setAttribute('method', 'POST');
loginForm.setAttribute('action', '/auth/login');
loginForm.setAttribute('id', 'loginForm');

const emailInputLogin = document.createElement('input');
emailInputLogin.setAttribute('type', 'email');
emailInputLogin.setAttribute('name', 'email');
emailInputLogin.setAttribute('placeholder', 'Email');
emailInputLogin.setAttribute('required', 'true');

const passwordInputLogin = document.createElement('input');
passwordInputLogin.setAttribute('type', 'password');
passwordInputLogin.setAttribute('name', 'password');
passwordInputLogin.setAttribute('placeholder', 'Password');
passwordInputLogin.setAttribute('required', 'true');

const submitButtonLogin = document.createElement('button');
submitButtonLogin.setAttribute('type', 'submit');
submitButtonLogin.textContent = 'Login';

loginForm.appendChild(emailInputLogin);
loginForm.appendChild(passwordInputLogin);
loginForm.appendChild(submitButtonLogin);

document.body.appendChild(loginForm);

const urlLogin = 'http://localhost:3000/auth/login';

submitButtonLogin.addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInputLogin.value;
  const password = passwordInputLogin.value;

  fetch(urlLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.user.email) {
        window.location.href = './index.html';
      } else {
        alert('Invalid email or password');
      }
    });
});
