// Admin dashboard logic
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';

function showSection(section) {
  document.querySelectorAll('.edit-section').forEach(s => s.classList.add('hidden'));
  document.getElementById(`edit-${section}`).classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  // Login logic
  const loginSection = document.getElementById('login-section');
  const dashboardSection = document.getElementById('dashboard-section');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');

  if (sessionStorage.getItem('adminLoggedIn')) {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    showSection('hero');
    loadAllForms();
  }

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminLoggedIn', 'true');
      loginSection.classList.add('hidden');
      dashboardSection.classList.remove('hidden');
      showSection('hero');
      loadAllForms();
    } else {
      loginError.classList.remove('hidden');
    }
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    location.reload();
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.section);
    });
  });

  // Form logic
  function loadAllForms() {
    const data = getData();
    // Hero
    document.getElementById('edit-full-name').value = data.personalInfo.name;
    document.getElementById('edit-tagline').value = data.personalInfo.tagline;
    // About
    document.getElementById('edit-about-me').value = data.personalInfo.bio;
    // Contact
    document.getElementById('edit-contact-email').value = data.personalInfo.contact.email;
    document.getElementById('edit-contact-phone').value = data.personalInfo.contact.phone;
    document.getElementById('edit-contact-location').value = data.personalInfo.contact.location;
    // Social Links
    renderSocialLinksEdit(data.socialLinks);
    // Skills
    renderSkillsEdit(data.skills);
  }

  // Hero form
  document.getElementById('hero-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    data.personalInfo.name = document.getElementById('edit-full-name').value;
    data.personalInfo.tagline = document.getElementById('edit-tagline').value;
    const fileInput = document.getElementById('edit-profile-photo');
    if (fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        data.personalInfo.profilePhoto = evt.target.result;
        setData(data);
        alert('Saved!');
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      setData(data);
      alert('Saved!');
    }
  });

  // About form
  document.getElementById('about-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    data.personalInfo.bio = document.getElementById('edit-about-me').value;
    setData(data);
    alert('Saved!');
  });

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    data.personalInfo.contact.email = document.getElementById('edit-contact-email').value;
    data.personalInfo.contact.phone = document.getElementById('edit-contact-phone').value;
    data.personalInfo.contact.location = document.getElementById('edit-contact-location').value;
    setData(data);
    alert('Saved!');
  });

  // Social Links form
  function renderSocialLinksEdit(links) {
    const list = document.getElementById('social-links-list');
    list.innerHTML = '';
    links.forEach((link, idx) => {
      const div = document.createElement('div');
      div.className = 'flex items-center gap-2';
      div.innerHTML = `
        <input type="text" value="${link.platform}" class="p-2 border rounded platform-input" data-idx="${idx}" style="width:100px;">
        <input type="url" value="${link.url}" class="p-2 border rounded url-input" data-idx="${idx}" style="width:200px;">
        <input type="text" value="${link.icon}" class="p-2 border rounded icon-input" data-idx="${idx}" style="width:100px;">
        <button type="button" class="remove-social-btn text-red-600" data-idx="${idx}">Remove</button>
      `;
      list.appendChild(div);
    });
    // Remove logic
    list.querySelectorAll('.remove-social-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.idx;
        const data = getData();
        data.socialLinks.splice(idx, 1);
        setData(data);
        renderSocialLinksEdit(data.socialLinks);
      });
    });
  }
  document.getElementById('add-social-btn').addEventListener('click', () => {
    const platform = document.getElementById('new-social-platform').value;
    const url = document.getElementById('new-social-url').value;
    const icon = document.getElementById('new-social-icon').value;
    if (platform && url && icon) {
      const data = getData();
      data.socialLinks.push({ platform, url, icon });
      setData(data);
      renderSocialLinksEdit(data.socialLinks);
      document.getElementById('new-social-platform').value = '';
      document.getElementById('new-social-url').value = '';
      document.getElementById('new-social-icon').value = '';
    }
  });
  document.getElementById('social-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    const platforms = Array.from(document.querySelectorAll('.platform-input'));
    const urls = Array.from(document.querySelectorAll('.url-input'));
    const icons = Array.from(document.querySelectorAll('.icon-input'));
    data.socialLinks = platforms.map((input, idx) => ({
      platform: input.value,
      url: urls[idx].value,
      icon: icons[idx].value
    }));
    setData(data);
    alert('Saved!');
  });

  // Skills form
  function renderSkillsEdit(skills) {
    const list = document.getElementById('skills-list-edit');
    list.innerHTML = '';
    skills.forEach((skill, idx) => {
      const span = document.createElement('span');
      span.className = 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1';
      span.innerHTML = `<i class="fab fa-${skill.icon}"></i> ${skill.name} <button type="button" class="remove-skill-btn text-red-600 ml-2" data-idx="${idx}">x</button>`;
      list.appendChild(span);
    });
    // Remove logic
    list.querySelectorAll('.remove-skill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.idx;
        const data = getData();
        data.skills.splice(idx, 1);
        setData(data);
        renderSkillsEdit(data.skills);
      });
    });
  }
  document.getElementById('add-skill-btn').addEventListener('click', () => {
    const name = document.getElementById('new-skill-name').value;
    const icon = document.getElementById('new-skill-icon').value;
    if (name && icon) {
      const data = getData();
      data.skills.push({ name, icon });
      setData(data);
      renderSkillsEdit(data.skills);
      document.getElementById('new-skill-name').value = '';
      document.getElementById('new-skill-icon').value = '';
    }
  });
  document.getElementById('skills-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    // No need to update, already handled by add/remove
    alert('Saved!');
  });
}); 