const token = localStorage.getItem('token');
const toursTable = document.getElementById('toursTable');
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

    toursTable.innerHTML = '';

    tours.forEach(tour => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${tour.name}</td>
        <td>${tour.country}</td>
        <td>${tour.city || ''}</td>
        <td>${tour.startDate ? tour.startDate.slice(0, 10) : ''}</td>
        <td>${tour.durationDays}</td>
        <td>${tour.price}</td>
        <td>${tour.availableSeats}</td>
        <td>${tour.description}</td>
        <td>
          <button onclick="editTour('${tour._id}')">Редактировать</button>
          <button onclick="deleteTour('${tour._id}')">Удалить</button>
        </td>
      `;

      toursTable.appendChild(row);
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