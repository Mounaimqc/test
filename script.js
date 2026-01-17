// Toggle mobile nav
document.addEventListener('DOMContentLoaded',()=>{
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('#main-nav ul');
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  if(toggle && navList){
    toggle.addEventListener('click',()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });

    // Close nav when clicking a link
    navList.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      navList.classList.remove('show');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
});

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // يمنع إعادة تحميل الصفحة

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  fetch("https://formspree.io/f/xykkkezq", { // استبدل xxx بالـ Form ID تاعك
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      status.innerText = "Message envoyé avec succès !";
      form.reset();
    } else {
      status.innerText = "Erreur lors de l'envoi du message.";
    }
  })
  .catch(error => {
    status.innerText = "Erreur réseau, veuillez réessayer.";
    console.error(error);
  });
});
