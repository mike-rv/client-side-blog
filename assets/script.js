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
    PostServer()
    fetchText("notFirst")

})

async function fetchText(x) {

  let response = await fetch('https://mock-zuckerberg.herokuapp.com/');
  let data = await response.json();
  if (x === "First"){
  for (let i = 0; i < data.length; i++) {
    postBoxTemplate(data[i].post, data[i].id, data[i].comment)
   } }
   else
   {
    let response = await fetch('https://mock-zuckerberg.herokuapp.com/');
    let data = await response.json();
    postBoxTemplate(data[data.length - 1].post, data[data.length - 1].id, data[data.length - 1].comment)
   }
}


const PostServer = () => {
  fetch(`https://mock-zuckerberg.herokuapp.com/` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        post: document.querySelector('#post-content').value 
      })
    }).then(res => {
      return res.json()
    })
      .then(data => console.log(data))
      .catch(error => console.log('ERROR'))

}


const postBoxTemplate = (post, id , comment) => {
  const box = document.createElement('div')
  box.classList.add("previous-comments");

  document.querySelector(".container-post-history").prepend(box)


  const innerBox = document.createElement('div')

  innerBox.classList.add("white-background-comments")
  innerBox.textContent = post;

  box.appendChild(innerBox)

  const interactionBox = document.createElement('div')
  interactionBox.style.border = '1px solid grey';
  interactionBox.style['min-height'] = '2vh';
  interactionBox.style['background-color'] = 'white';
  interactionBox.style['padding'] = '3%';
  interactionBox.style['font-size'] = '100%';
  interactionBox.style['border-radius'] = '50px';
  interactionBox.style['padding'] = '5%';
  interactionBox.style.bottom = "5%"
  interactionBox.textContent = comment;

  box.appendChild(interactionBox);

}


fetchText("First")

async function fetchNewPost() {
  let response = await fetch('https://mock-zuckerberg.herokuapp.com/');
  let data = await response.json();
  postBoxTemplate(data[data.length - 1].post)
}
