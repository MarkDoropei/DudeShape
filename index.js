const like = document.getElementsByClassName('img__like')
like.addEventListener('click',() => {
    like.src = 'images/like-active.png';
})

like.addEventListener('dblclick',() => {
    like.src = 'images/like.png';
})