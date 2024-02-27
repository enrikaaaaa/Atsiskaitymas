const url = 'http://localhost:3010/memberships';

const renderMemberships = (memberships) => {
  const table = document.getElementById('memberships');
  memberships.forEach((membership) => {
    const row = document.createElement('tr');

    const cellName = document.createElement('td');
    (cellName.textContent =
      membership.name + ' ' + '€' + ' ' + membership.price),
      row.appendChild(cellName);

    const cellDescription = document.createElement('td');
    cellDescription.textContent = membership.description;
    cellDescription.classList.add('description');
    row.appendChild(cellDescription);

    const cellDelete = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-danger');
    deleteButton.addEventListener('click', () => {
      fetch(url + '/' + membership._id, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          row.remove();
        })
        .catch((error) => console.error(error));
    });
    cellDelete.appendChild(deleteButton);
    row.appendChild(cellDelete);

    table.appendChild(row);
  });
};

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    renderMemberships(data);
  })
  .catch((error) => console.error(error));

const create = document.getElementById('create');
create.addEventListener('click', () => {
  window.location.href = 'create.html';
});
