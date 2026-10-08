// Project Data for Interactive Modal
const projectsData = {
  portfolio: {
    title: 'Website Portofolio Pribadi',
    category: 'Personal Project • Web Design',
    image: 'assets/img/projects/portfolio.svg',
    desc: 'Website portofolio interaktif dengan konsep desain soft pastel pink modern. Dibangun secara mobile-first dan responsif dengan struktur semantic HTML5, styling Tailwind CSS terstruktur, serta micro-interactivity JavaScript untuk menampilkan identitas siswa kejuruan RPL.',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Responsive', 'Pastel Aesthetic']
  },
  sekolah: {
    title: 'Website Kelas XI RPL',
    category: 'School Portal • Web Application',
    image: 'assets/img/projects/sekolah.jpg',
    desc: 'Platform web internal untuk siswa kelas XI Rekayasa Perangkat Lunak SMKN 6 Surakarta. Menyediakan informasi jadwal pelajaran harian, agenda piket, struktur kepengurusan kelas, papan pengumuman tugas kejuruan, dan dokumentasi foto kegiatan kelas.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'CSS Grid', 'Academic System']
  },
  wisata: {
    title: 'Project UI/UX School App',
    category: 'UI/UX Design • Prototyping',
    image: 'assets/img/projects/wisata.jpg',
    desc: 'Purwarupa antarmuka aplikasi peminjaman buku perpustakaan digital sekolah dan portal destinasi studi wisata. Berfokus pada kemudahan navigasi siswa, hierarki tipografi yang jelas, serta palet warna yang ramah mata.',
    tags: ['Figma', 'UI/UX', 'Design System', 'Wireframing', 'User Research']
  },
  programming: {
    title: 'Project Pemrograman Dasar',
    category: 'Mini Web App • Logic & Algorithm',
    image: 'assets/img/projects/programming.svg',
    desc: 'Aplikasi latihan pemrograman dasar berbasis web yang mengimplementasikan sistem CRUD (Create, Read, Update, Delete) sederhana untuk mendata absensi dan nilai siswa, dilengkapi kalkulator konversi angka desimal-biner menggunakan JavaScript DOM manipulation.',
    tags: ['JavaScript', 'DOM Manipulation', 'Algorithms', 'LocalStorage', 'Clean Code']
  }
};

// Open Project Modal
function openProjectModal(key) {
  const p = projectsData[key];
  if (!p) return;

  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalImg').src = p.image;
  document.getElementById('modalImg').alt = p.title;
  document.getElementById('modalDesc').textContent = p.desc;

  const tagsContainer = document.getElementById('modalTags');
  tagsContainer.innerHTML = '';
  p.tags.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = t;
    tagsContainer.appendChild(span);
  });

  const modal = document.getElementById('projectModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Project Modal
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'projectModal') {
    closeProjectModal();
  }
}

// Toast Notification
function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastMsg');
  toastText.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Copy to Clipboard
function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'Berhasil disalin ke clipboard!');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast(successMsg || 'Berhasil disalin ke clipboard!');
}

// Handle Contact Form Submit -> Redirect to WhatsApp with formatted text
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  if (!name || !message) {
    showToast('Mohon lengkapi nama dan pesan Anda.');
    return;
  }

  const waNumber = '62859708480016';
  const text = `Halo Rahh Mania Ainnur,%0A%0ASaya *${encodeURIComponent(name)}* (${encodeURIComponent(email)}) ingin menyampaikan pesan:%0A"${encodeURIComponent(message)}"%0A%0APesan dikirim melalui Website Portofolio Pastel.`;

  showToast('Membuka WhatsApp...');
  setTimeout(() => {
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    document.getElementById('contactForm').reset();
  }, 600);
}

// Mobile Drawer Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileDrawer = document.getElementById('mobileDrawer');

if (menuToggle && mobileDrawer) {
  menuToggle.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
  });

  // Close drawer when link clicked
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });
}

// Intersection Observer for Skills Progress Animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-progress-fill');
      fills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-progress');
        fill.style.width = targetWidth;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Scroll Handling: Navbar styling, Back-to-Top button, ScrollSpy
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-item-link');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;

  // Navbar shadow
  if (scrollPos > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top visibility
  if (scrollPos > 350) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  // ScrollSpy
  let currentId = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentId = sec.getAttribute('id');
    }
  });

  if (currentId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    mobileLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }
});

// ESC key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});
