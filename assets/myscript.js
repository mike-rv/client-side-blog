//displays text input in previous comments history
const btn = document.querySelector('.button-post');
const p = document.querySelector('p');
const form = document.querySelector('form');
const input = document.querySelector('#post');
const containerHistory = document.querySelector('.white-background-comments')

btn.addEventListener('click', () => {
    p.textContent = "No posts recorded";
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = input.value
    p.textContent = inputValue
})

//code below not working correctly, need to implement. displays emoji in textarea
const smileyEmoji = document.querySelector('.smiley-emoji')
const thumbsUpEmoji = document.querySelector('.thumbs-up-emoji')
const thumbsDownEmoji = document.querySelector('.thumbs-down-emoji')
const section = document.querySelector('.section')
// const buttonPost = document.querySelector('.button-post')
const inputArea = document.querySelector('.input-area')

smileyEmoji.addEventListener('click', e => {
    inputArea.append(String.fromCodePoint(parseInt(0x1F642)))
    
})

thumbsUpEmoji.addEventListener('click', e => {
    inputArea.append(String.fromCodePoint(parseInt(0x1F44D)))
})

thumbsDownEmoji.addEventListener('click', e => {
    inputArea.append(String.fromCodePoint(parseInt(0x1F44E)))
})

//giphy API:
let APIKEY = "txsMIouNt5mOzBbVoneiBmy1yjhXwYub"

document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault(); //to stop the page reload
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        let fc = document.createElement("figcaption");
        img.src = content.data[0].images.downsized.url;
        img.alt = content.data[0].title;
        fc.textContent = content.data[0].title;
        fig.appendChild(img);
        fig.appendChild(fc);
        let out = document.querySelector(".out");
        containerHistory.insertAdjacentElement("afterbegin", fig);
        document.querySelector("#search").value = "";
      })
      .catch(err => {
        console.error(err);
      });
  });
}


