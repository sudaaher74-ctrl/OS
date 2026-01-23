// ===============================
// Mobile Navigation
// ===============================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===============================
// Header scroll effect
// ===============================
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===============================
// Project filtering
// ===============================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
        });
    });
});

// ===============================
// Project Modal
// ===============================
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const modalMainImage = document.getElementById('modalMainImage');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImages = [];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openProjectModal(btn.closest('.project-card'));
        });
    });
});

function openProjectModal(projectCard) {
    const data = projectCard.querySelector('.project-data');

    document.getElementById('modalProjectTitle').textContent =
        data.querySelector('.project-title').textContent;

    document.getElementById('modalProjectCategory').textContent =
        projectCard.getAttribute('data-category');

    document.getElementById('modalProjectLocation').textContent =
        data.querySelector('.project-location').textContent;

    document.getElementById('modalProjectScope').textContent =
        data.querySelector('.project-scope').textContent;

    document.getElementById('modalProjectDuration').textContent =
        data.querySelector('.project-duration').textContent;

    document.getElementById('modalProjectArea').textContent =
        data.querySelector('.project-area').textContent;

    document.getElementById('modalProjectDescription').textContent =
        data.querySelector('.project-description').textContent;

    currentImages = Array.from(data.querySelectorAll('.project-images img')).map(img => img.src);
    currentImageIndex = 0;

    updateGallery();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateGallery() {
    modalMainImage.src = currentImages[currentImageIndex];
    thumbnailsContainer.innerHTML = '';

    currentImages.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail' + (index === currentImageIndex ? ' active' : '');
        thumb.innerHTML = `<img src="${img}">`;

        thumb.onclick = () => {
            currentImageIndex = index;
            updateGallery();
        };
        thumbnailsContainer.appendChild(thumb);
    });
}

nextBtn.onclick = () => {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateGallery();
};

prevBtn.onclick = () => {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateGallery();
};

closeModal.onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

modal.onclick = e => {
    if (e.target === modal) closeModal.onclick();
};

// ===============================
// ✅ CONTACT FORM (UPDATED)
// ===============================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        requirement: document.getElementById('requirement').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Thank you! We will contact you shortly.');
            contactForm.reset();
        } else {
            alert('❌ Submission failed. Try again.');
        }
    } catch (error) {
        alert('❌ Server error. Please try later.');
        console.error(error);
    }
});

// ===============================
// Smooth Scrolling
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});
