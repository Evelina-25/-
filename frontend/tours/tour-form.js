const token = localStorage.getItem('token');
const form = document.getElementById('tourForm');
const urlParams = new URLSearchParams(window.location.search);
const tourId = urlParams.get('id');

const imageInput = document.querySelector('input[name="image"]');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.innerHTML = `<img src="${event.target.result}" style="max-width: 200px; max-height: 150px; border-radius: 8px; border: 1px solid #ddd;">`;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.innerHTML = '';
  }
});

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

if (data.imageUrl) {
  imagePreview.innerHTML = `<img src="http://localhost:5000${data.imageUrl}" style="max-width: 200px; max-height: 150px; border-radius: 8px; border: 1px solid #ddd;">`;
}
    })
    .catch(err => {
      console.error(err);
      alert('Ошибка загрузки тура');
    });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  
  console.log('=== ОТПРАВКА ФОРМЫ ===');
  for (let pair of formData.entries()) {
    if (pair[0] === 'image' && pair[1] instanceof File) {
      console.log('image:', 'Файл:', pair[1].name, 'Размер:', pair[1].size, 'Тип:', pair[1].type);
    } else {
      console.log(pair[0] + ':', pair[1]);
    }
  }
  console.log('=======================');

  try {
    let res;
    const url = tourId 
      ? `http://localhost:5000/api/tours/${tourId}`
      : 'http://localhost:5000/api/tours';
    
    const method = tourId ? 'PUT' : 'POST';

    res = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Ошибка сохранения');
      return;
    }

    alert('Тур успешно сохранён');
    window.location.href = 'tours.html';

  } catch (e) {
    console.error(e);
    alert('Ошибка сервера');
  }
});