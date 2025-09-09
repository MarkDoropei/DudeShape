const text = document.querySelectorAll('.features__item')

text.forEach(item => {
  item.addEventListener('click', () => {
    text.forEach(i => i.style.color = '');
    text.forEach(i => i.style.fontWeight = 300); 
    text.forEach(i => i.style.borderBottom = 'none');
    item.style.color = '#154444';
    item.style.fontWeight = 900;
    item.style.borderBottom = '1.5px solid #154444'
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const pwStrength = document.getElementById('pwStrength');
  const formSuccess = document.getElementById('formSuccess');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

  function setValidState(input, valid, message = '') {
    const wrapper = input.closest('.form-group');
    const errorEl = wrapper.querySelector('.error');
    input.classList.toggle('is-valid', valid);
    input.classList.toggle('is-invalid', !valid);
    input.setAttribute('aria-invalid', String(!valid));
    if (errorEl) errorEl.textContent = message;
  }

  function debounce(fn, wait = 250) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  function validateEmail(input) {
    const v = input.value.trim();
    const ok = emailRegex.test(v);
    setValidState(input, ok, ok ? '' : 'Please enter a valid email (example@domain.com)');
    input.setCustomValidity(ok ? '' : 'invalid email');
    return ok;
  }

  function validateRequired(input) {
    const v = input.value.trim();
    const ok = v.length > 0;
    setValidState(input, ok, ok ? '' : 'This field is required');
    input.setCustomValidity(ok ? '' : 'required');
    return ok;
  }

  function validatePassword(input) {
    const v = input.value;
    const ok = passwordRegex.test(v);
    pwStrength.value = estimatePasswordStrength(v);
    setValidState(input, ok, ok ? '' : 'Password: minimum 8 characters, letter and number');
    input.setCustomValidity(ok ? '' : 'weak password');
    return ok;
  }

  function estimatePasswordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score += 30;
    if (pw.length >= 12) score += 20;
    if (/[A-Z]/.test(pw)) score += 15;
    if (/[0-9]/.test(pw)) score += 20;
    if (/[^A-Za-z0-9]/.test(pw)) score += 15;
    return Math.min(score, 100);
  }

  emailInput.addEventListener('input', debounce(e => validateEmail(e.target), 300));
  nameInput.addEventListener('input', debounce(e => validateRequired(e.target), 200));
  passwordInput.addEventListener('input', debounce(e => validatePassword(e.target), 200));
  [nameInput, emailInput, passwordInput].forEach(inp => {
    inp.addEventListener('animationend', () => inp.classList.remove('shake'));
  });
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let ok = true;
    if (!validateRequired(nameInput)) ok = false;
    if (!validateEmail(emailInput)) ok = false;
    if (!validatePassword(passwordInput)) ok = false;
    if (!ok) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.classList.add('shake');
      }
      formSuccess.textContent = '';
      return;
    }
    formSuccess.textContent = 'The form is correct. Sending...';
  });
});

const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));

document.querySelectorAll('img.fade-img').forEach(img => {
  if (img.complete) img.classList.add('loaded');
  else img.addEventListener('load', () => img.classList.add('loaded'));
});

