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
    card.className = 'client-card';
    card.innerHTML = `
      <div class="client-name" >${c.name}</div>
      <div class="client-detail">
        <span class="detail-label">Паспорт:</span>
        <span class="detail-value">${c.passport || '—'}</span>
      </div>
      <div class="client-detail">
        <span class="detail-label">Телефон:</span>
        <span class="detail-value">${c.phone || '—'}</span>
      </div>
      <div class="client-detail">
        <span class="detail-label">Email:</span>
        <span class="detail-value">${c.email || '—'}</span>
      </div>
      <div class="card-actions">
        <button class="edit-btn" onclick="editClient('${c._id}')">Редактировать</button>
        <button class="delete-btn" onclick="deleteClient('${c._id}')">Удалить</button>
      </div>
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