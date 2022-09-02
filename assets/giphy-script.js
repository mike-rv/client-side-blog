//code below not working correctly, need to implement. displays emoji in textarea
// const smileyEmoji = document.querySelector('.smiley-emoji')
// const thumbsUpEmoji = document.querySelector('.thumbs-up-emoji')
// const thumbsDownEmoji = document.querySelector('.thumbs-down-emoji')
// const section = document.querySelector('.section')
// const buttonPost = document.querySelector('.button-post')
const commentBoxTextArea = document.querySelector('.input-area')
const historyContainer = document.querySelector('.container-post-history')

let APIKEY = "txsMIouNt5mOzBbVoneiBmy1yjhXwYub"

// document.addEventListener("DOMContentLoaded", init);
// function init() {
  document.getElementById("btnSearch").addEventListener("click", e => {
    e.preventDefault(); //to stop the page reload
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        console.log(content.data);
        // console.log("META", content.meta);
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        // let fc = document.createElement("figcaption");
        img.src = content.data[0].images.downsized.url;
        img.alt = content.data[0].title;
        console.log(content.data[0].images.downsized.url)
        // fc.textContent = content.data[0].title;
        // fig.appendChild(img);
        // fig.appendChild(fc);
        // let out = document.querySelector(".out");
        document.querySelector("#textbox2").value = img.src
        document.querySelector("#search").value = "";
      })
      .catch(err => {
        console.error(err);
      });
  });
// }
