const smileyEmoji = document.querySelector('.smiley-emoji')
const thumbsUpEmoji = document.querySelector('.thumbs-up-emoji')
const thumbsDownEmoji = document.querySelector('.thumbs-down-emoji')
const section = document.querySelector('.section')
const buttonPost = document.querySelector('.button-post')
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

buttonPost.addEventListener('click', function (e) {
    e.preventDefault()

    const box = document.createElement('div')

    box.style.border = '1px solid grey';
    box.style['min-width'] = '60vw'
    box.style['min-height'] = '400px'
    box.style['display'] = 'flex';
    box.style['flex-direction'] = 'column';
    box.style['justify-content'] = 'center';
    box.style['row-gap'] = '9%';
    box.style['background-color'] = '#e0e0e0';
    box.style['border-radius'] = '50px';
    box.style['padding'] = '1%'

    section.appendChild(box)

    const innerBox = document.createElement('div')

    innerBox.style.border = '1px solid grey';
    // innerBox.style['min-width'] = '10%'
    innerBox.style['min-height'] = '60%'
    innerBox.style['background-color'] = 'white'
    innerBox.style['padding'] = '3%'
    innerBox.style['font-size'] = '100%'
    innerBox.style['border-radius'] = '50px';
    innerBox.style['padding'] = '5%'
    innerBox.style['font-family'] = 'arial'

    box.appendChild(innerBox)

    fetch('http://localhost:3000/')
        .then(resp => resp.text())
        .then(data => {
            innerBox.append(data)
        })



})

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
        section.insertAdjacentElement("afterbegin", fig);
        document.querySelector("#search").value = "";
      })
      .catch(err => {
        console.error(err);
      });
  });
}
