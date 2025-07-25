// Renders public site sections from data.js
document.addEventListener('DOMContentLoaded', () => {
  const data = getData();
  // Hero
  document.getElementById('profile-photo').src = data.personalInfo.profilePhoto;
  document.getElementById('full-name').textContent = data.personalInfo.name;
  document.getElementById('tagline').textContent = data.personalInfo.tagline;
  // About
  document.getElementById('about-me').textContent = data.personalInfo.bio;
  // Contact
  document.getElementById('contact-email').textContent = `Email: ${data.personalInfo.contact.email}`;
  document.getElementById('contact-phone').textContent = `Phone: ${data.personalInfo.contact.phone}`;
  document.getElementById('contact-location').textContent = `Location: ${data.personalInfo.contact.location}`;
  // Social Links
  const socialLinksDiv = document.getElementById('social-links');
  socialLinksDiv.innerHTML = '';
  data.socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.className = 'text-2xl hover:text-blue-600';
    a.innerHTML = `<i class="fab fa-${link.icon}"></i> ${link.platform}`;
    socialLinksDiv.appendChild(a);
  });
  // Skills
  const skillsDiv = document.getElementById('skills-list');
  skillsDiv.innerHTML = '';
  data.skills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1';
    span.innerHTML = `<i class="fab fa-${skill.icon}"></i> ${skill.name}`;
    skillsDiv.appendChild(span);
  });
}); 