const token = localStorage.getItem('token'); 
const clientsTable = document.getElementById('clientsTable');
const addClientBtn = document.getElementById('addClientBtn');

addClientBtn.addEventListener('click', () => {
  window.location.href = 'client-form.html';
});

async function fetchClients() {
  const res = await fetch('http://localhost:5000/api/clients', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const clients = await res.json();
  clientsTable.innerHTML = '';
  clients.forEach(c => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.passport}</td>
      <td>${c.phone || ''}</td>
      <td>${c.email || ''}</td>
      <td>
        <button onclick="editClient('${c._id}')">Редактировать</button>
        <button onclick="deleteClient('${c._id}')">Удалить</button>
      </td>
    `;
    clientsTable.appendChild(row);
  });
}

window.editClient = (id) => {
  window.location.href = `client-form.html?id=${id}`;
}

window.deleteClient = async (id) => {
  const confirmDelete = confirm('Вы действительно хотите удалить клиента?');
  if (!confirmDelete) return;
  
  await fetch(`http://localhost:5000/api/clients/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  fetchClients();
}

fetchClients();