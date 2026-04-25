const token = localStorage.getItem('token');
const toursContainer = document.getElementById('toursContainer');
const addTourBtn = document.getElementById('addTourBtn');
const ClientsBtn = document.getElementById('ClientsBtn');
const applicationsBtn = document.getElementById('applicationsBtn');
if (!token) {
  window.location.href = '/Avt/avt.html';
}

addTourBtn.addEventListener('click', () => {
  window.location.href = 'tour-form.html';
});
if (ClientsBtn) {
   ClientsBtn.addEventListener('click', () => {
    window.location.href = '../Clients/clients.html';
  });
}

if (applicationsBtn) {
  applicationsBtn.addEventListener('click', () => {
    window.location.href = '../Application/applications.html';
  });
}

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
      card.className = 'tour-card';
      card.innerHTML = `
        <div class="tour-name">${tour.name}</div>
        
        <div class="tour-detail">
          <span class="detail-label">Страна:</span>
          <span class="detail-value">${tour.country || '—'}</span>
        </div>
        
        <div class="tour-detail">
          <span class="detail-label">Город:</span>
          <span class="detail-value">${tour.city || '—'}</span>
        </div>
        
        <div class="tour-detail">
          <span class="detail-label">Дата начала:</span>
          <span class="detail-value">${tour.startDate ? tour.startDate.slice(0, 10) : '—'}</span>
        </div>
        
        <div class="tour-detail">
          <span class="detail-label">Длительность:</span>
          <span class="detail-value">${tour.durationDays} дн.</span>
        </div>
        
        <div class="tour-detail">
          <span class="detail-label">Цена:</span>
          <span class="detail-value">${tour.price} ₽</span>
        </div>
        
        <div class="tour-detail">
          <span class="detail-label">Свободных мест:</span>
          <span class="detail-value">${tour.availableSeats}</span>
        </div>
        
        <div class="tour-detail">
          <span class="detail-label">Описание:</span>
          <span class="detail-value">${tour.description || '—'}</span>
        </div>
        
        <div class="card-actions">
          <button class="edit-btn" onclick="editTour('${tour._id}')">Редактировать</button>
          <button class="delete-btn" onclick="deleteTour('${tour._id}')">Удалить</button>
        </div>
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