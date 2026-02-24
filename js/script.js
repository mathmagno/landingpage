/*ISSO É INTERESSANTE APÓS PASSAR O MOUSE EM CIMA DOS LINKS NO NAVBAR ELES CRIAM 
UM EFEITO 
*/
const links = document.querySelectorAll('.sidebar a');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.letterSpacing = '1px';
  });

  link.addEventListener('mouseleave', () => {
    link.style.letterSpacing = '0';
  });
});