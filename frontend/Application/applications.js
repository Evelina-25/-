const token = localStorage.getItem('token');
const applicationsTable = document.getElementById('applicationsTable');
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

    applicationsTable.innerHTML = '';

    applications.forEach(application => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${application.clientId?.name || ''}</td>
        <td>${application.tourId?.name || ''}</td>
        <td>${application.peopleCount}</td>
        <td>
  ${
    application.bookingStatus === 'NEW'
      ? 'Новая'
      : application.bookingStatus === 'CONFIRMED'
      ? 'Подтверждена'
      : application.bookingStatus === 'CANCELLED'
      ? 'Отменена'
      : application.bookingStatus
  }
        </td>

<td>
  ${application.paymentStatus === 'PAID' ? 'Оплачено' : 'Не оплачено'}
</td>
<td>
  ${
    application.paymentStatus === 'UNPAID'
      ? `<button onclick="payApplication('${application._id}')">Оплатить</button>`
      : ''
  }
</td>
        <td>${application.bookingDate ? application.bookingDate.slice(0, 10) : ''}</td>
        <td>
          <button onclick="confirmApplication('${application._id}')">Подтвердить</button>
          <button onclick="issueDocuments('${application._id}')">Выдать документы</button>
          <button onclick="deleteApplication('${application._id}')">Удалить</button>
        </td>
      `;

      applicationsTable.appendChild(row);
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
  const confirmPay = confirm('Подтвердить оплату заявки?');
  if (!confirmPay) return;

  try {
    const res = await fetch(`http://localhost:5000/api/payments/pay/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ method: 'cash' }) 
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert('Оплата подтверждена');
    fetchApplications();

  } catch (e) {
    console.error(e);
    alert('Ошибка подтверждения оплаты');
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