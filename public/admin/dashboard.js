// Fetch and render users
fetch('/admin/api/users')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('userList');
    list.innerHTML = data.map(u => `<p>${u.email} - ${u.role}</p>`).join('');
  });

// Create Quiz
document.getElementById('createQuizForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const res = await fetch('/admin/api/quizzes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    alert('Quiz created');
    e.target.reset();
  }
});

// Fetch quiz results
fetch('/admin/api/results')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('resultsList');
    container.innerHTML = data.map(r =>
      `<p>${r.email} - ${r.score} - ${r.quizTitle}</p>`).join('');
  });

// Upload material
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const res = await fetch('/admin/api/upload', {
    method: 'POST',
    body: formData
  });
  if (res.ok) {
    alert('Upload successful');
    form.reset();
  }
});
