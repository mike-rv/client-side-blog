const btn = document.querySelector('.button-post');
const p = document.querySelector('p');
const form = document.querySelector('form');
const input = document.querySelector('#post');

btn.addEventListener('click', () => {
    p.textContent = "No posts recorded";
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = input.value
    p.textContent = inputValue
})

