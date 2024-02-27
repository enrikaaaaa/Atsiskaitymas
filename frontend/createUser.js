const url = 'http://localhost:3010/users';

const createUserForm = document.getElementById('createUserForm');
const div = document.createElement('div');
const label = document.createElement('label');
label.textContent = 'Name';
div.appendChild(label);
const input = document.createElement('input');
input.setAttribute('name', 'name');
div.appendChild(input);
createUserForm.appendChild(div);

const div1 = document.createElement('div');
const label1 = document.createElement('label');
label1.textContent = 'Last Name';
div1.appendChild(label1);
const input1 = document.createElement('input');
input1.setAttribute('name', 'surname');
div1.appendChild(input1);
createUserForm.appendChild(div1);

const div2 = document.createElement('div');
const label2 = document.createElement('label');
label2.textContent = 'Email adress';
div2.appendChild(label2);
const input2 = document.createElement('input');
input2.setAttribute('name', 'email');
div2.appendChild(input2);
createUserForm.appendChild(div2);

const div3 = document.createElement('div');
const label3 = document.createElement('label');
label3.textContent = 'Change membership';
div3.appendChild(label3);
const changeMembership = document.createElement('select');
changeMembership.setAttribute('name', 'membership');
div3.appendChild(changeMembership);
createUserForm.appendChild(div3);

fetch('http://localhost:3010/memberships')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((membership) => {
      const option = document.createElement('option');
      option.textContent = membership.name;
      option.value = membership._id;
      changeMembership.appendChild(option);
    });
  })
  .catch((error) => console.error(error));

const createUser = document.getElementById('createUser');
createUser.addEventListener('click', () => {
  const name = document.querySelector('input[name="name"]').value;
  const surname = document.querySelector('input[name="surname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const membership = document.querySelector('select[name="membership"]').value;
  fetch('http://localhost:3010/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, surname, email, membership }),
  })
    .then(() => {
      window.location.href = 'users.html';
    })
    .catch((error) => console.error(error));
});

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', () => {
  window.location.href = 'users.html';
});
