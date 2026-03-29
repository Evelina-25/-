const token = localStorage.getItem('token');
const form = document.getElementById('clientForm');
const urlParams = new URLSearchParams(window.location.search);
const clientId = urlParams.get('id');

if (clientId) {
  document.getElementById('formTitle').innerText = 'Редактировать клиента';

  fetch(`http://localhost:5000/api/clients/${clientId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      form.name.value = data.name || '';
      form.passport.value = data.passport || '';
      form.phone.value = data.phone || '';
      form.email.value = data.email || '';
      form.birthdate.value = data.birthdate ? data.birthdate.slice(0, 10) : '';
    })
    .catch(err => {
      console.error(err);
      alert("Ошибка загрузки клиента");
    });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const clientData = {
    name: form.name.value.trim(),
    passport: form.passport.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    birthdate: form.birthdate.value
  };

  try {
    let res;

    if (clientId) {
      res = await fetch(`http://localhost:5000/api/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(clientData)
      });
    } else {
      res = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(clientData)
      });
    }

    const data = await res.json();

    if (!res.ok) {
      alert(data); 
      return;
    }

    alert("Клиент успешно сохранён");
    window.location.href = 'clients.html';

  } catch (e) {
    console.error(e);
    alert("Ошибка сервера");
  }
});