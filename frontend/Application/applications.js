const token = localStorage.getItem('token');
const applicationsContainer = document.getElementById('applicationsContainer');
const addApplicationBtn = document.getElementById('addApplicationBtn');

if (!token) {
  window.location.href = '/Avt/avt.html';
}

addApplicationBtn.addEventListener('click', () => {
  window.location.href = 'application-form.html';
});

async function fetchApplications() {
  try {
    const res = await fetch('http://localhost:5000/api/applications', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const applications = await res.json();

    if (!res.ok) {
      alert(applications.message || 'Ошибка загрузки заявок');
      return;
    }


    applicationsContainer.innerHTML = '';

    applications.forEach(application => {
      const card = document.createElement('div');
      card.className = 'application-card';
      card.innerHTML = `
      <div class="application-title">${application.clientId?.name || 'Клиент не указан'}</div>
      <div class="application-info">
        <p>Тур: ${application.tourId?.name || 'Тур не указан'}</p>
        <p>Количество человек: ${application.peopleCount}</p>
        <p>Статус брони:<span class="status-badge">${
          application.bookingStatus === 'NEW'
            ? 'Новая'
            : application.bookingStatus === 'CONFIRMED'
            ? 'Подтверждена'
            : application.bookingStatus === 'CANCELLED'
            ? 'Отменена'
            : application.bookingStatus
        }</span></p>
        <p>Статус оплаты: <span class="status-badge ${
          application.paymentStatus === 'PAID' ? 'payment-paid' : 'payment-unpaid'
        }">${
          application.paymentStatus === 'PAID' ? 'Оплачено' : 'Не оплачено'
        }</span></p>
        <p>Дата бронирования: ${
          application.bookingDate ? application.bookingDate.slice(0, 10) : '—'
        }</p>
      </div>
      <div class="card-actions">
        ${
          application.paymentStatus === 'UNPAID'
            ? `<button class="pay-btn" onclick="payApplication('${application._id}')">Оплатить</button>`
            : ''
        }
        ${application.bookingStatus !== 'CONFIRMED' ? `<button class="confirm-btn" onclick="confirmApplication('${application._id}')">Подтвердить</button>` : ''}
        <button class="documents-btn" onclick="issueDocuments('${application._id}')"> Выдать документы</button>
        <button class="delete-btn" onclick="deleteApplication('${application._id}')"> Удалить</button>
      </div>
     
    `;

      applicationsContainer.appendChild(card);
    });

  } catch (e) {
    console.error(e);
    alert('Ошибка сервера');
  }
}

window.confirmApplication = async (id) => {
    const confirmAction = confirm('Вы действительно хотите подтвердить заявку?');

  if (!confirmAction) return;
  try {
    const res = await fetch(`http://localhost:5000/api/applications/confirm/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert('Заявка подтверждена');
    fetchApplications();

  } catch (e) {
    console.error(e);
    alert('Ошибка подтверждения заявки');
  }
};

window.payApplication = async (id) => {
  console.log('=== НАЧАЛО ОПЛАТЫ ===');
  console.log('ID заявки:', id);
  
  const token = localStorage.getItem('token');
  console.log('Токен есть?', token ? 'ДА' : 'НЕТ');
  console.log('Токен:', token);
  
  const confirmPay = confirm('Подтвердить оплату заявки?');
  if (!confirmPay) return;

  const url = `http://localhost:5000/api/payments/${id}`;
  console.log('URL запроса:', url);

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ method: 'cash' })
    });

    console.log('Статус ответа:', res.status);
    
    const data = await res.json();
    console.log('Ответ сервера:', data);

    if (!res.ok) {
      alert(`Ошибка ${res.status}: ${data.message || 'Неизвестная ошибка'}`);
      return;
    }

    alert('Оплата подтверждена');
    fetchApplications();

  } catch (e) {
    console.error('Ошибка при выполнении fetch:', e);
    alert('Ошибка подключения к серверу: ' + e.message);
  }
};

window.issueDocuments = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/applications/issue-documents/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert('Документы выданы');

  } catch (e) {
    console.error(e);
    alert('Ошибка выдачи документов');
  }
};

window.deleteApplication = async (id) => {
  const confirmDelete = confirm('Удалить заявку?');

  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/applications/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert(data.message);
    fetchApplications();

  } catch (e) {
    console.error(e);
    alert('Ошибка удаления заявки');
  }
};

fetchApplications();