/* -------------------------------------------------
   GLOBAL HELPERS
   ------------------------------------------------- */
function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }

/* -------------------------------------------------
   NAVIGATION – mobile toggle
   ------------------------------------------------- */
const nav = $('#nav');
const navToggle = $('.nav__toggle');
const navClose = $('.nav__close');

navToggle.addEventListener('click', () => nav.classList.add('open'));
navClose.addEventListener('click', () => nav.classList.remove('open'));

/* -------------------------------------------------
   DARK / LIGHT MODE
   ------------------------------------------------- */
const themeToggleBtn = $('#theme-toggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');

if (storedTheme) {
    root.setAttribute('data-theme', storedTheme);
    setIcon(storedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setIcon(next);
});

function setIcon(theme) {
    const icon = $('#theme-icon');
    if (theme === 'dark') {
        // Moon icon
        icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle>
                         <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>`;
    } else {
        // Sun icon
        icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle>
                         <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>`;
    }
}

/* -------------------------------------------------
   AOS – scroll animations
   ------------------------------------------------- */
AOS.init({
    once: true,
    duration: 800,
    offset: 120,
});

/* -------------------------------------------------
   Swiper – Projects carousel
   ------------------------------------------------- */
const swiper = new Swiper('.mySwiper', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: { delay: 5000 },
    spaceBetween: 30,
    breakpoints: {
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
    },
});

/* -------------------------------------------------
   CONTACT FORM – client‑side validation + EmailJS (optional)
   ------------------------------------------------- */
const form = $('#contact-form');
const status = $('#form-status');

form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = '';
    const { name, email, message } = form;

    // Simple validation
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        status.textContent = 'Please fill in all required fields.';
        status.style.color = 'var(--color-accent)';
        return;
    }

    // ----- If you want to use EmailJS -----
    // 1. Sign up at https://www.emailjs.com/
    // 2. Create a service & template
    // 3. Replace USER_ID, SERVICE_ID, TEMPLATE_ID below
    // -------------------------------------------------
    // const serviceID = 'YOUR_SERVICE_ID';
    // const templateID = 'YOUR_TEMPLATE_ID';
    // const userID = 'YOUR_PUBLIC_KEY';
    // try {
    //     await emailjs.sendForm(serviceID, templateID, form, userID);
    //     status.textContent = 'Message sent! 🎉';
    //     status.style.color = 'var(--color-primary)';
    //     form.reset();
    // } catch (err) {
    //     status.textContent = 'Oops! Something went wrong.';
    //     status.style.color = 'var(--color-accent)';
    // }
    // -------------------------------------------------

    // --------- Fallback: just show a success message ---------
    status.textContent = 'Form submitted (demo mode).';
    status.style.color = 'var(--color-primary)';
    form.reset();
});

/* -------------------------------------------------
   Footer – current year
   ------------------------------------------------- */
$('#year').textContent = new Date().getFullYear();