const createForm = document.getElementById('create-form');
const div = document.createElement('div');
const label = document.createElement('label');
label.textContent = 'Name';
div.appendChild(label);
const input = document.createElement('input');
input.setAttribute('name', 'name');
div.appendChild(input);
createForm.appendChild(div);

const label1 = document.createElement('label');
const div1 = document.createElement('div');
label1.textContent = 'Membership Price';
div1.appendChild(label1);
const input1 = document.createElement('input');
input1.value = '$  ';
input1.setAttribute('name', 'price');
div1.appendChild(input1);
createForm.appendChild(div1);

const text = document.createElement('label');
const div2 = document.createElement('div');
text.textContent = 'Description';
div2.appendChild(text);
const description = document.createElement('textarea');
description.setAttribute('name', 'description');
div2.appendChild(description);
createForm.appendChild(div2);

const createMembership = document.getElementById('createMembership');
createMembership.addEventListener('click', () => {
  const name = document.querySelector('input[name="name"]').value;
  const price = document.querySelector('input[name="price"]').value;
  const description = document.querySelector(
    'textarea[name="description"]',
  ).value;
  fetch('http://localhost:3010/memberships', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, description }),
  })
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => console.error(error));
});

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', () => {
  window.location.href = 'index.html';
});
