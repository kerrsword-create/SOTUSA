/* ========================================================
   SOTUSA SHOOTING SPORTS CLUB — MAIN JAVASCRIPT
   Version: 1.0.0
   ======================================================== */

/* ---- FAQ ACCORDION ---- */
function toggleFaq(el) {
  var item = el.parentElement;
  var icon = el.querySelector('.faq-icon');
  var isOpen = item.classList.contains('open');

  /* Close all open items first */
  document.querySelectorAll('.faq-item.open').forEach(function (i) {
    i.classList.remove('open');
    i.querySelector('.faq-icon').textContent = '+';
  });

  /* Open clicked item if it was closed */
  if (!isOpen) {
    item.classList.add('open');
    icon.textContent = '−';
  }
}

/* ---- FORM SUBMISSION ---- */
function handleSubmit() {
  var fn   = document.getElementById('fn').value.trim();
  var em   = document.getElementById('em').value.trim();
  var tier = document.getElementById('tier').value;

  if (!fn || !em || !tier) {
    alert('Please fill in your name, email address, and membership interest to continue.');
    return;
  }

  /* Show loading state */
  var btn = document.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = 'Submitting…';

  /*
   * TODO: Replace the setTimeout below with a real API call.
   *
   * Example using Formspree (free tier — just create an account at formspree.io):
   *
   *   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({
   *       first_name:       fn,
   *       last_name:        document.getElementById('ln').value.trim(),
   *       email:            em,
   *       phone:            document.getElementById('ph').value.trim(),
   *       membership_tier:  tier,
   *       service:          document.getElementById('service').value,
   *       notes:            document.getElementById('notes').value.trim()
   *     })
   *   })
   *   .then(function(res) {
   *     if (res.ok) { showSuccess(); }
   *     else        { btn.disabled = false; btn.textContent = 'Reserve my founding spot →'; alert('Something went wrong — please try again or email us directly at Admin@sot.LLC'); }
   *   })
   *   .catch(function() {
   *     btn.disabled = false;
   *     btn.textContent = 'Reserve my founding spot →';
   *     alert('Network error — please email us directly at Admin@sot.LLC');
   *   });
   *
   * Example using Mailchimp embedded form:
   *   — Add the hidden Mailchimp fields to your HTML form
   *   — Set form action to your Mailchimp post URL
   *   — Submit via standard POST
   *
   * Example using HubSpot Forms API:
   *   fetch('https://api.hsforms.com/submissions/v3/integration/submit/YOUR_PORTAL_ID/YOUR_FORM_GUID', { ... })
   */

  /* Simulated success for demo — remove this once real endpoint is wired */
  setTimeout(showSuccess, 700);
}

function showSuccess() {
  document.getElementById('formEl').style.display = 'none';
  var s = document.getElementById('successState');
  s.classList.add('visible');
  s.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ---- SCROLL-TRIGGERED FADE-UP ANIMATIONS ---- */
document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.proof-cell, .spec-card, .range-card, .tier, .quote-card, .faq-item, .vs-table tbody tr, .vet-bar'
  );

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity    = '1';
        e.target.style.transform  = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(function (t, i) {
    t.style.opacity    = '0';
    t.style.transform  = 'translateY(16px)';
    t.style.transition = 'opacity 0.55s ease ' + (i * 0.04) + 's, transform 0.55s ease ' + (i * 0.04) + 's';
    obs.observe(t);
  });
});

/* ---- SMOOTH NAV CTA ---- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
