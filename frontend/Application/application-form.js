const token = localStorage.getItem('token');
const form = document.getElementById('applicationForm');
const clientSelect = document.getElementById('clientSelect');
const tourSelect = document.getElementById('tourSelect');

if (!token) {
  window.location.href = '/Avt/avt.html';
}

async function loadClients() {
  try {
    const res = await fetch('http://localhost:5000/api/clients', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const clients = await res.json();

    clients.forEach(client => {
      const option = document.createElement('option');
      option.value = client._id;
      option.textContent = `${client.name} (${client.passport})`;
      clientSelect.appendChild(option);
    });

  } catch (e) {
    console.error(e);
    alert('Ошибка загрузки клиентов');
  }
}

async function loadTours() {
  try {
    const res = await fetch('http://localhost:5000/api/tours', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const tours = await res.json();

    tours.forEach(tour => {
      const option = document.createElement('option');
      option.value = tour._id;
      option.textContent = `${tour.name} - ${tour.country} - мест: ${tour.availableSeats}`;
      tourSelect.appendChild(option);
    });

  } catch (e) {
    console.error(e);
    alert('Ошибка загрузки туров');
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const applicationData = {
    clientId: form.clientId.value,
    tourId: form.tourId.value,
    peopleCount: Number(form.peopleCount.value)
  };

  try {
    const res = await fetch('http://localhost:5000/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(applicationData)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert('Заявка успешно создана');
    window.location.href = 'applications.html';

  } catch (e) {
    console.error(e);
    alert('Ошибка сервера');
  }
});

loadClients();
loadTours();