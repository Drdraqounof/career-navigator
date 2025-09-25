// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax effect on hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`; 
  }
});

// Hide/show CTA button on scroll
let lastScroll = 0;
const cta = document.querySelector('.cta-button');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    if (cta) cta.classList.add('hidden'); // scrolling down
  } else {
    if (cta) cta.classList.remove('hidden'); // scrolling up
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});

// Load page dynamically into #mainContent
function loadPage(page) {
  fetch(page)
    .then(res => res.text())
    .then(data => {
      document.getElementById("mainContent").innerHTML = data;
    })
    .catch(() => {
      document.getElementById("mainContent").innerHTML = "<p>Page not found.</p>";
    });
}

// --- LOGIN LOGIC ---
// Check if logged in (stored in localStorage)
function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}

// Protect Test link
const testLink = document.getElementById("testLink");
if (testLink) {
  testLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (isLoggedIn()) {
      window.location.href = "groupsheet.html"; // go to test page
    } else {
      window.location.href = "login.html";   // must log in first
    }
  });
}

// --- OPTIONAL: expose helper functions ---
// Call this after successful login (on login.html)
function loginUser() {
  localStorage.setItem("loggedIn", "true");
  window.location.href = "groupsheet.html";
}

// Call this when user clicks logout
function logoutUser() {
  localStorage.removeItem("loggedIn");
  window.location.href = "case.html";
}

// Make helpers available globally
window.loginUser = loginUser;
window.logoutUser = logoutUser;

