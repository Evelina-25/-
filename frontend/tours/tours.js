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
        <div class="tour-card-content">
          <div class="tour-info">
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
          </div>
       <div class="tour-slider" data-tour-id="${tour._id}">
    ${tour.images && tour.images.length > 0 ? `
        <div class="slides">
            ${tour.images.map((img, index) => `
                <div class="slide ${index === 0 ? 'active' : ''}">
                    <img src="http://localhost:5000${img}" alt="${tour.name}" loading="lazy">
                </div>
            `).join('')}
        </div>
        ${tour.images.length > 1 ? `
            <button class="slider-btn prev" onclick="changeSlide('${tour._id}', -1)">‹</button>
            <button class="slider-btn next" onclick="changeSlide('${tour._id}', 1)">›</button>
            <div class="dots">
                ${tour.images.map((_, index) => `
                    <button class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide('${tour._id}', ${index})"></button>
                `).join('')}
            </div>
            <div class="slide-count">1 / ${tour.images.length}</div>
        ` : ''}
    ` : `
        <div class="slides">
            <div class="slide active">
                <div class="no-photo">
                    <span>Нет фото</span>
                </div>
            </div>
        </div>
    `}
</div>
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

window.changeSlide = function(tourId, direction) {
    const slider = document.querySelector(`.tour-slider[data-tour-id="${tourId}"]`);
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const countEl = slider.querySelector('.slide-count');
    
    let currentIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === newIndex);
    });
    
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === newIndex);
        });
    }
    
    if (countEl) {
        countEl.textContent = `${newIndex + 1} / ${slides.length}`;
    }
};

window.goToSlide = function(tourId, index) {
    const slider = document.querySelector(`.tour-slider[data-tour-id="${tourId}"]`);
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const countEl = slider.querySelector('.slide-count');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    if (countEl) {
        countEl.textContent = `${index + 1} / ${slides.length}`;
    }
};

fetchTours();