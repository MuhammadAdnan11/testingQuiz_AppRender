// // Wait for DOM to load
// document.addEventListener('DOMContentLoaded', () => {
//   fetchTotalUsers();
//   fetchUsers();
//   setupQuizForm();
//   fetchResults();
//   setupUploadForm();
// });

// // ✅ Fetch and display total registered users
// async function fetchTotalUsers() {
//   try {
//     const res = await fetch('/admin/api/total-users');
//     if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

//     const data = await res.json();
//     const section = document.querySelector('#users');
    
//     // Append total users count to the Manage Users section
//     const total = document.createElement('p');
//     total.textContent = `Total Registered Users: ${data.totalUsers || 0}`;
//     section.prepend(total);
//   } catch (err) {
//     console.error('Error fetching total users:', err);
//   }
// }

// // ✅ Fetch and display list of users
// async function fetchUsers() {
//   try {
//     const res = await fetch('/admin/api/users');
//     if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

//     const data = await res.json();
//     if (!Array.isArray(data)) throw new Error('Expected an array of users');

//     const userList = document.getElementById('userList');
//     userList.innerHTML = ''; // Clear any previous content

//     data.forEach(user => {
//       const div = document.createElement('div');
//       div.textContent = `📧 ${user.email} (${user.role})`;
//       userList.appendChild(div);
//     });
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     const userList = document.getElementById('userList');
//     userList.textContent = 'Failed to load user list.';
//   }
// }

// // ✅ Handle quiz creation form submission
// function setupQuizForm() {
//   const form = document.getElementById('createQuizForm');
//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const title = form.title.value.trim();
//     const course = form.course.value.trim();

//     try {
//       const res = await fetch('/admin/api/quizzes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, course })
//       });

//       if (!res.ok) throw new Error('Failed to create quiz');
//       alert('Quiz created successfully!');
//       form.reset();
//     } catch (err) {
//       console.error('Error creating quiz:', err);
//       alert('Error creating quiz. Check console for details.');
//     }
//   });
// }

// // ✅ Fetch and display quiz results
// async function fetchResults() {
//   try {
//     const res = await fetch('/admin/api/results');
//     if (!res.ok) throw new Error('Failed to fetch results');

//     const data = await res.json();
//     if (!Array.isArray(data)) throw new Error('Expected an array of results');

//     const list = document.getElementById('resultsList');
//     list.innerHTML = '';
//     data.forEach(r => {
//       const div = document.createElement('div');
//       div.textContent = `${r.email} - ${r.quizTitle}: ${r.score}`;
//       list.appendChild(div);
//     });
//   } catch (err) {
//     console.error('Error loading results:', err);
//     const list = document.getElementById('resultsList');
//     list.textContent = 'Failed to load results.';
//   }
// }

// // ✅ Handle upload of study material
// function setupUploadForm() {
//   const form = document.getElementById('uploadForm');

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = new FormData(form);
//     try {
//       const res = await fetch('/admin/api/upload', {
//         method: 'POST',
//         body: formData
//       });

//       if (!res.ok) throw new Error('Failed to upload material');

//       const data = await res.json();
//       alert(data.message || 'Upload successful!');
//       form.reset();
//     } catch (err) {
//       console.error('Upload error:', err);
//       alert('Upload failed.');
//     }
//   });
// }
const res = await fetch('/admin/api/total-users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-user-email': localStorage.getItem('email')
  }
});


// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  fetchTotalUsers();
  fetchUsers();
  setupQuizForm();
  fetchResults();
  setupUploadForm();
});


// Get logged-in email from localStorage
const userEmail = localStorage.getItem('email') || '';

if (!userEmail) {
  alert('You must be logged in to access the admin dashboard.');
  window.location.href = '/login.html'; // or wherever your login page is
}

// ✅ Fetch and display total registered users
async function fetchTotalUsers() {
  try {
    const res = await fetch('/admin/api/total-users', {
      headers: {
        'X-User-Email': userEmail
      }
    });
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

// ✅ Fetch and display list of users
async function fetchUsers() {
  try {
    const res = await fetch('/admin/api/users', {
      headers: {
        'X-User-Email': userEmail
      }
    });
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

// ✅ Handle quiz creation form submission
function setupQuizForm() {
  const form = document.getElementById('createQuizForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const course = form.course.value.trim();

    try {
      const res = await fetch('/admin/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify({ title, course })
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

// ✅ Fetch and display quiz results
async function fetchResults() {
  try {
    const res = await fetch('/admin/api/results', {
      headers: {
        'X-User-Email': userEmail
      }
    });
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

// ✅ Handle upload of study material
function setupUploadForm() {
  const form = document.getElementById('uploadForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const res = await fetch('/admin/api/upload', {
        method: 'POST',
        headers: {
          'X-User-Email': userEmail
        },
        body: formData
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
