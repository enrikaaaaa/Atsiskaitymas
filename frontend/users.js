const url = 'http://localhost:3010/users/asc';

const renderUsers = (users) => {
  const table = document.getElementById('users');
  users.forEach((user) => {
    const row = document.createElement('tr');
    row.classList.add('user');
    const cellName = document.createElement('td');
    cellName.classList.add('name');
    cellName.textContent = user.name + ' ' + user.surname;
    row.appendChild(cellName);
    const cellEmail = document.createElement('td');
    cellEmail.textContent = 'Email Adress: ' + user.email;
    row.appendChild(cellEmail);
    const cellMembership = document.createElement('td');
    cellMembership.textContent =
      'Membership: ' +
      fetch('http://localhost:3010/memberships/' + user.membershipId)
        .then((response) => response.json())
        .then((data) => {
          return data.name;
        })
        .catch((error) => console.error(error));
    row.appendChild(cellMembership);
    const cellIp = document.createElement('td');
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        cellIp.textContent = 'IP: ' + data.ip;
      })
      .catch((error) => console.error(error));
    row.appendChild(cellIp);
    table.appendChild(row);
  });
};

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    renderUsers(data);
  })
  .catch((error) => console.error(error));

const createUsers = document.getElementById('createUser');
createUsers.addEventListener('click', () => {
  window.location.href = 'createUser.html';
});
