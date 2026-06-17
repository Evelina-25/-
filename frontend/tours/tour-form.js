const token = localStorage.getItem('token');
const form = document.getElementById('tourForm');
const urlParams = new URLSearchParams(window.location.search);
const tourId = urlParams.get('id');

const imageInput = document.querySelector('input[name="images"]');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', (e) => {
  const files = e.target.files;
  imagePreview.innerHTML = '';
  
  if (files.length > 0) {
      Array.from(files).forEach(file => {
          const reader = new FileReader();
          reader.onload = (event) => {
              const img = document.createElement('img');
              img.src = event.target.result;
              img.style.maxWidth = '150px';
              img.style.maxHeight = '150px';
              img.style.borderRadius = '8px';
              img.style.border = '1px solid #ddd';
              img.style.margin = '5px';
              imagePreview.appendChild(img);
          };
          reader.readAsDataURL(file);
      });
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

      if (data.images && data.images.length > 0) {
        imagePreview.innerHTML = '';
        data.images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = `http://localhost:5000${imageUrl}`;
            img.style.maxWidth = '150px';
            img.style.maxHeight = '150px';
            img.style.borderRadius = '8px';
            img.style.border = '1px solid #ddd';
            img.style.margin = '5px';
            imagePreview.appendChild(img);
        });
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
    if (pair[0] === 'images' && pair[1] instanceof File) {
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