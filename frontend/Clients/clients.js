const token = localStorage.getItem('token'); 
const clientsContainer = document.getElementById('clientsContainer');
const addClientBtn = document.getElementById('addClientBtn');

addClientBtn.addEventListener('click', () => {
  window.location.href = 'client-form.html';
});

async function fetchClients() {
  const res = await fetch('http://localhost:5000/api/clients', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const clients = await res.json();
  clientsContainer.innerHTML = '';
  clients.forEach(c => {
    const card = document.createElement('div');
      card.innerHTML = `
      <h3>${c.name}</h3>
      <p><strong>Паспорт:</strong> ${c.passport}</p>
      <p><strong>Телефон:</strong> ${c.phone || ''}</p>
      <p><strong>Email:</strong> ${c.email || ''}</p>
      <button onclick="editClient('${c._id}')">Редактировать</button>
      <button onclick="deleteClient('${c._id}')">Удалить</button>
      <hr>
`;
    clientsContainer.appendChild(card);
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