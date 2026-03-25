const token = localStorage.getItem('token');
const form = document.getElementById('clientForm');
const urlParams = new URLSearchParams(window.location.search);
const clientId = urlParams.get('id');

if(clientId) {
  document.getElementById('formTitle').innerText = 'Редактировать клиента';
  fetch(`http://localhost:5000/api/clients/${clientId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    form.name.value = data.name;
    form.passport.value = data.passport;
    form.phone.value = data.phone;
    form.email.value = data.email;
    form.birthdate.value = data.birthdate.slice(0,10);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const clientData = {
    name: form.name.value,
    passport: form.passport.value,
    phone: form.phone.value,
    email: form.email.value,
    birthdate: form.birthdate.value
  };
  if(clientId){
    await fetch(`http://localhost:5000/api/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });
  } else {
    await fetch('http://localhost:5000/api/clients', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });
  }
  window.location.href = 'clients.html';
});