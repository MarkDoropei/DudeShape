// const like = document.getElementsByClassName('img__like')
// like.addEventListener('click',() => {
//     like.src = 'images/like-active.png';
// })

// like.addEventListener('dblclick',() => {
//     like.src = 'images/like.png';
// })

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
