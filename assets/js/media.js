var items = document.querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('click', event => {
    item.classList.toggle('fullscreen');
  })
})
