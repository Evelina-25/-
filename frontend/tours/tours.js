const token = localStorage.getItem('token');
const toursContainer = document.getElementById('toursContainer');
const addTourBtn = document.getElementById('addTourBtn');

if (!token) {
  window.location.href = '/Avt/avt.html';
}

addTourBtn.addEventListener('click', () => {
  window.location.href = 'tour-form.html';
});

async function fetchTours() {
  try {
    const res = await fetch('http://localhost:5000/api/tours', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const tours = await res.json();

    if (!res.ok) {
      alert(tours);
      return;
    }

    toursContainer.innerHTML = '';

    tours.forEach(tour => {
      const card = document.createElement('div');

      card.innerHTML = `
        <h3>${tour.name}</h3>
        <p><strong>Страна:</strong> ${tour.country}</p>
        <p><strong>Город:</strong> ${tour.city || ''}</p>
        <p><strong>Дата начала:</strong> ${tour.startDate ? tour.startDate.slice(0, 10) : ''}</p>
        <p><strong>Длительность:</strong> ${tour.durationDays}</p>
        <p><strong>Цена:</strong> ${tour.price}</p>
        <p><strong>Мест:</strong> ${tour.availableSeats}</p>
        <p><strong>Описание:</strong> ${tour.description}</p>
        <button onclick="editTour('${tour._id}')">Редактировать</button>
        <button onclick="deleteTour('${tour._id}')">Удалить</button>
        <hr>
      `;      

      toursContainer.appendChild(card);
    });

  } catch (e) {
    console.error(e);
    alert('Ошибка загрузки туров');
  }
}

window.editTour = (id) => {
  window.location.href = `tour-form.html?id=${id}`;
};

window.deleteTour = async (id) => {
  const confirmDelete = confirm('Удалить тур?');

  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/tours/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data);
      return;
    }

    fetchTours();

  } catch (e) {
    console.error(e);
    alert('Ошибка удаления тура');
  }
};

fetchTours();