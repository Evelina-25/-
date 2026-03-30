const token = localStorage.getItem('token');
const form = document.getElementById('tourForm');
const urlParams = new URLSearchParams(window.location.search);
const tourId = urlParams.get('id');

if (tourId) {
  document.getElementById('formTitle').innerText = 'Редактировать тур';

  fetch(`http://localhost:5000/api/tours/${tourId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      form.name.value = data.name || '';
      form.country.value = data.country || '';
      form.city.value = data.city || '';
      form.startDate.value = data.startDate
        ? new Date(data.startDate).toISOString().split('T')[0]
        : '';
      form.durationDays.value = data.durationDays || '';
      form.price.value = data.price || '';
      form.availableSeats.value = data.availableSeats || '';
      form.description.value = data.description || '';
    })
    .catch(err => {
      console.error(err);
      alert('Ошибка загрузки тура');
    });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tourData = {
    name: form.name.value.trim(),
    country: form.country.value.trim(),
    city: form.city.value.trim(),
    startDate: form.startDate.value,
    durationDays: Number(form.durationDays.value),
    price: Number(form.price.value),
    availableSeats: Number(form.availableSeats.value),
    description: form.description.value.trim()
  };

  try {
    let res;

    if (tourId) {
      res = await fetch(`http://localhost:5000/api/tours/${tourId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tourData)
      });
    } else {
      res = await fetch('http://localhost:5000/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tourData)
      });
    }

    const data = await res.json();

    if (!res.ok) {
      alert(data);
      return;
    }

    alert('Тур успешно сохранён');
    window.location.href = 'tours.html';

  } catch (e) {
    console.error(e);
    alert('Ошибка сервера');
  }
});