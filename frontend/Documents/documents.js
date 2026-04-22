const token = localStorage.getItem('token');
const container = document.getElementById('documentsContainer');

const params = new URLSearchParams(window.location.search);
const applicationId = params.get('applicationId');
const typeMap = {
  APPLICATION: "Заявка",
  PAYMENT_RECEIPT: "Чек об оплате",
  TOUR_VOUCHER: "Туристский ваучер",
  SERVICE_CONTRACT: "Договор",
  TOURIST_MEMO: "Туристическая путевка"
};
async function fetchDocuments() {
  try {
    const res = await fetch(`http://localhost:5000/api/documents/application/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const docs = await res.json();

    if (!res.ok) {
      alert(docs.message);
      return;
    }

    container.innerHTML = '';

    docs.forEach(doc => {
      const div = document.createElement('div');
        div.className = 'doc-card';
div.innerHTML = `
  <h3>${typeMap[doc.type] || doc.type}</h3>
  <p> ${doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('ru-RU') : '—'}</p>
`;
      container.appendChild(div);
    });

  } catch (e) {
    console.error(e);
    alert('Ошибка загрузки документов');
  }
}

fetchDocuments();