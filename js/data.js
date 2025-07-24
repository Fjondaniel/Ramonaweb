// Handles data storage and retrieval for the personal website
const DUMMY_DATA = {
  personalInfo: {
    name: "Jane Doe",
    tagline: "Web Developer & Designer",
    bio: "I'm Jane, a passionate web developer with a love for clean design and modern web technologies.",
    profilePhoto: "public/profile.jpg",
    contact: {
      email: "jane@example.com",
      phone: "+1234567890",
      location: "New York, USA"
    }
  },
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/janedoe", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/janedoe", icon: "linkedin" }
  ],
  skills: [
    { name: "React", icon: "react" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Node.js", icon: "node" }
  ]
};

const STORAGE_KEY = 'personalWebsiteData';

function getData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : DUMMY_DATA;
}

function setData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
} 