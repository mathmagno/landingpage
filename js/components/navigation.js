// navigation.js
// JavaScript puro — navegação e scroll

const links = document.querySelectorAll('.sidebar a');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.letterSpacing = '1px';
  });

  link.addEventListener('mouseleave', () => {
    link.style.letterSpacing = '0';
  });
});