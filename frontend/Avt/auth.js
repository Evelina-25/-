const form = document.querySelector('.reg-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = form.username.value;
  const password = form.password.value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {

      localStorage.setItem('token', data.token);

      window.location.href = '../index.html';
    } else {
      alert(data.message || 'Ошибка авторизации');
    }

  } catch (e) {
    console.error(e);
    alert('Ошибка сервера');
  }
});