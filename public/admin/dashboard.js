// dashboard.js

// Get logged-in user info from localStorage
const userEmail = localStorage.getItem('email') || '';
const userRole = localStorage.getItem('role') || '';

if (!userEmail || userRole !== 'admin') {
  alert('You must be logged in as an admin to access the admin dashboard.');
  window.location.href = '/login.html'; // redirect to login
}

// Helper: Make fetch requests with email header
function fetchWithEmail(url, options = {}) {
  options.headers = {
    ...(options.headers || {}),
    'X-User-Email': userEmail,
  };
  return fetch(url, options);
}

// Check if current user is admin before loading dashboard
async function checkAdmin() {
  try {
    const res = await fetchWithEmail('/admin/api/check-admin');
    if (!res.ok) {
      throw new Error(`Access denied: ${res.status}`);
    }
    const data = await res.json();
    console.log('Admin check success:', data);
    return true;
  } catch (err) {
    alert('Access denied. You must be an admin to view this page.');
    window.location.href = '/login.html'; // or some other page
    return false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const isAdmin = await checkAdmin();
  if (!isAdmin) return;

  // Proceed with fetching dashboard data only if admin
  fetchTotalUsers();
  fetchUsers();
  setupQuizForm();
  fetchResults();
  setupUploadForm();
});

// Fetch total registered users
async function fetchTotalUsers() {
  try {
    const res = await fetchWithEmail('/admin/api/total-users');
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    const data = await res.json();
    const section = document.querySelector('#users');

    const total = document.createElement('p');
    total.textContent = `Total Registered Users: ${data.totalUsers || 0}`;
    section.prepend(total);
  } catch (err) {
    console.error('Error fetching total users:', err);
  }
}

// Fetch and display users list
async function fetchUsers() {
  try {
    const res = await fetchWithEmail('/admin/api/users');
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Expected an array of users');

    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    data.forEach(user => {
      const div = document.createElement('div');
      div.textContent = `📧 ${user.email} (${user.role})`;
      userList.appendChild(div);
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    const userList = document.getElementById('userList');
    userList.textContent = 'Failed to load user list.';
  }
}

// Setup quiz creation form
function setupQuizForm() {
  const form = document.getElementById('createQuizForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const course = form.course.value.trim();

    try {
      const res = await fetchWithEmail('/admin/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, course }),
      });

      if (!res.ok) throw new Error('Failed to create quiz');
      alert('Quiz created successfully!');
      form.reset();
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Error creating quiz. Check console for details.');
    }
  });
}

// Fetch and display quiz results
async function fetchResults() {
  try {
    const res = await fetchWithEmail('/admin/api/results');
    if (!res.ok) throw new Error('Failed to fetch results');

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Expected an array of results');

    const list = document.getElementById('resultsList');
    list.innerHTML = '';
    data.forEach(r => {
      const div = document.createElement('div');
      div.textContent = `${r.email} - ${r.quizTitle}: ${r.score}`;
      list.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading results:', err);
    const list = document.getElementById('resultsList');
    list.textContent = 'Failed to load results.';
  }
}

// Setup upload form for study material
function setupUploadForm() {
  const form = document.getElementById('uploadForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const res = await fetchWithEmail('/admin/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload material');

      const data = await res.json();
      alert(data.message || 'Upload successful!');
      form.reset();
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed.');
    }
  });
}
