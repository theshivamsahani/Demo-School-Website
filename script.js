// Animate on scroll (simple fade/slide up)
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".animated").forEach(el => el.classList.add("slideUp"));
  loadNotices();
  loadEvents();
  setupGalleryCarousel();
});

// Notices board fetch (replace with backend API)
// ...existing code...

// Moving Marquee Notice Board (keeps scrolling notices)
function loadNotices() {
  const notices = [
    "CBSE Board Exam Results declared. Congratulations to our toppers!",
    "Admissions open for the 2025-26 session. Limited seats – enroll now!",
    "Parent-Teacher Meeting on 5th August.",
    "Annual Science Exhibition on 25th August, 11:00AM.",
    "Download school calendar from the Know More link."
  ];
  const ul = document.getElementById('notice-marquee');
  if (ul) {
    ul.innerHTML = notices.map(n => `<li>${n}</li>`).join('');
    // Clone for seamless scroll
    ul.innerHTML += notices.map(n => `<li>${n}</li>`).join('');
  }
}

function loadEvents() {
  const events = [
    "15th Aug: Independence Day Celebration",
    "21st Aug: Inter-school Football Tournament",
    "2nd Sept: Coding Bootcamp for Class 8-12",
    "10th Sept: Art & Craft Workshop"
  ];
  const ul = document.getElementById('upcoming-events-list');
  if (ul) {
    ul.innerHTML = events.map(e => `<li>${e}</li>`).join('');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  loadNotices();
  loadEvents();
});


// Single-image Gallery with Control
const galleryImgs = [
  "assets/gallery1.jpg",
  "assets/gallery2.jpg",
  "assets/gallery3.jpg",
  "assets/gallery4.jpg",
  "assets/gallery5.jpg",
  "assets/gallery6.jpg",
  "assets/gallery7.jpg",
  "assets/gallery8.jpg"
];
let galleryIndex = 0;
function showGalleryImage(idx) {
  const gallery = document.getElementById('gallery-single');
  if (!gallery) return;
  const n = galleryImgs.length;
  galleryIndex = (idx+n)%n;
  gallery.innerHTML = `<img src="${galleryImgs[galleryIndex]}" alt="Gallery">`;
}
document.addEventListener("DOMContentLoaded", function() {
  // ...existing code...
  showGalleryImage(0);
  const prev = document.getElementById('prev-gallery');
  const next = document.getElementById('next-gallery');
  if (prev && next) {
    prev.onclick = () => showGalleryImage(galleryIndex-1);
    next.onclick = () => showGalleryImage(galleryIndex+1);
    setInterval(()=>showGalleryImage(galleryIndex+1), 2700);
  }
});

// Auto-scrolling Gallery Carousel
function setupGalleryCarousel(){
  const carousel = document.getElementById('carousel');
  if(!carousel) return;
  let imgs = Array.from(carousel.children);
  let current = 0;

  function showNext() {
    imgs.forEach((img, i) => {
      img.style.transform = `translateX(${(i-current)*370}px)`;
      img.style.opacity = (i===current) ? '1' : '0.6';
      img.style.zIndex = (i===current) ? '10' : '1';
    });
  }
  showNext();
  setInterval(() => {
    current = (current+1)%imgs.length;
    showNext();
  }, 2500);
}

// Forms (Admissions/Contact)
document.addEventListener("submit", function(event) {
  if(event.target.matches("#admissions-form")){
    event.preventDefault();
    document.getElementById("admission-success").classList.remove("hidden");
    event.target.reset();
  }
  if(event.target.matches("#contact-form")){
    event.preventDefault();
    document.getElementById("contact-success").classList.remove("hidden");
    event.target.reset();
  }
});

function toggleAbout() {
  const full = document.getElementById('about-full');
  const btn = document.getElementById('read-more-btn');
  const ellipsis = document.getElementById('ellipsis');
  if (full.classList.contains('collapsed')) {
    full.classList.remove('collapsed');
    full.classList.add('expanded');
    btn.textContent = "Read Less";
    ellipsis.style.display = "none";
  } else {
    full.classList.add('collapsed');
    full.classList.remove('expanded');
    btn.textContent = "Read More";
    ellipsis.style.display = "inline";
    // Optionally scroll back up to button for usability
    btn.scrollIntoView({behavior:"smooth",block:"start"});
  }
}
// Highlights Strip Carousel with navigation buttons
document.addEventListener("DOMContentLoaded", () => {
  const strip = document.querySelector('.highlights-strip .images-wrapper');
  if (!strip) return;
  const images = strip.children;
  const totalImages = images.length;
  let currentIndex = 0;

  // Navigation buttons
  const prevBtn = document.querySelector('.highlights-strip .nav-btn.prev');
  const nextBtn = document.querySelector('.highlights-strip .nav-btn.next');

  function updatePosition() {
    const offset = -currentIndex * 100;
    strip.style.transform = `translateX(${offset}%)`;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updatePosition();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % totalImages;
    updatePosition();
  }

  prevBtn.addEventListener('click', () => {
    showPrev();
    resetAutoScroll();
  });
  nextBtn.addEventListener('click', () => {
    showNext();
    resetAutoScroll();
  });

  // Auto scroll every 3 seconds (right-to-left)
  let autoScrollInterval = setInterval(showNext, 3000);

  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(showNext, 3000);
  }

  updatePosition();
});
