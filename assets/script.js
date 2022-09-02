const smileyEmoji = document.querySelector('.smiley-emoji')
const thumbsUpEmoji = document.querySelector('.thumbs-up-emoji')
const thumbsDownEmoji = document.querySelector('.thumbs-down-emoji')
const section = document.querySelector('.section')
const buttonPost = document.querySelector('.button-post')
const inputArea = document.querySelector('.input-area')
const replyButton = document.querySelector('.reply-button')
const historySection = document.querySelector('.container-post-history')

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
    fetchContent("notFirst")

})

async function fetchContent(x, ID) {

  let response = await fetch('https://mock-zuckerberg.herokuapp.com/');
  let data = await response.json();
  if (x === "First"){
  for (let i = 0; i < data.length; i++) {
    postBoxTemplate(data[i].post, (data[i].id), data[i].smiley_count, data[i].like_count, data[i].dislike_count)
    let response2 = await fetch(`https://mock-zuckerberg.herokuapp.com/${i+1}`);
    let data2 = await response2.json();
    for (const property in data2) {
         FetchComment(`${property}`, `${data2[property]}`, i)
      }
   } }

   else if(x === "notFirst")
   {
    let response = await fetch('https://mock-zuckerberg.herokuapp.com/');
    let data = await response.json();
    postBoxTemplate(data[data.length - 1].post, data[data.length - 1].id , data[data.length - 1].smiley_count, data[data.length - 1].like_count, data[data.length - 1].dislike_count);
   }else if(x === "comment"){
    
    let response = await fetch(`https://mock-zuckerberg.herokuapp.com/${ID}`);
    let data = await response.json();
    let lastValue = data[Object.keys(data)[Object.keys(data).length - 1]];
    let lastKey = Object.keys(data).pop();
    
    document.querySelector(`#commentbox${ID}`).textContent += (lastKey.toString() + " : " + lastValue.toString())
   }else{
    let response = await fetch(`https://mock-zuckerberg.herokuapp.com/${ID}`);
    let data = await response.json();

    document.querySelector(`#smileyCount${ID}`).textContent = data.smiley_count;
    document.querySelector(`#likeCount${ID}`).textContent = data.like_count;
    document.querySelector(`#dislikeCount${ID}`).textContent = data.dislike_count;
   }
}
fetchContent("First")



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


const commentServer = e => {
  let index = ((e.target.id).slice(6))
  fetch(`https://mock-zuckerberg.herokuapp.com/${index}` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      comment: document.querySelector(`#textbox${index}`).value 
    })
  }).then(res => {
    return res.json()
  })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR')) 
}

const postBoxTemplate = (post, ID , happy, like, dislike) => {
  const buffer = document.createElement('div')
  const box = document.createElement('div')
  const historyPostSection = document.querySelector(".container-post-history")
  buffer.classList.add("buffer");
  box.classList.add("previous-comments");
  historyPostSection.prepend(buffer) // add buffer css = .buffer {height: 50px;}
  historyPostSection.prepend(box)

  const innerBox = document.createElement('div')
  innerBox.classList.add("white-background-comments")
  innerBox.textContent = post; // this doesn't make innerBox appear???
  box.appendChild(innerBox)

  const replyContainerMid = document.createElement('div')
  replyContainerMid.classList.add("reply-container-middle")
  box.appendChild(replyContainerMid)

  const inputAreaPost = document.createElement('textarea')
  inputAreaPost.classList.add('input-area-post')
  inputAreaPost.id = `textbox${ID}`; //???
  replyContainerMid.appendChild(inputAreaPost)

  const replyBoxMid = document.createElement('div')
  replyBoxMid.classList.add('reply-box-mid')
  replyBoxMid.id = `commentbox${ID}`; //  
  replyContainerMid.appendChild(replyBoxMid)

  const buttonBarPost = document.createElement('div')
  buttonBarPost.classList.add('button-bar-post')
  box.appendChild(buttonBarPost)

  const emojiBoxContainer = document.createElement('div')
  emojiBoxContainer.classList.add('emoji-box-container')
  buttonBarPost.appendChild(emojiBoxContainer)

  const emojiBoxCounter = document.createElement('div')
  const smileyCounter = document.createElement('div')
  const thumbsUpCounter = document.createElement('div')
  const thumbsDownCounter = document.createElement('div')
  smileyCounter.textContent = happy;
  thumbsUpCounter.textContent = like;
  thumbsDownCounter.textContent = dislike;
  smileyCounter.id = `smileyCount${ID}`
  thumbsUpCounter.id = `likeCount${ID}`
  thumbsDownCounter.id = `dislikeCount${ID}`
  emojiBoxCounter.classList.add('emoji-box-counter')
  emojiBoxContainer.appendChild(emojiBoxCounter)
  emojiBoxCounter.appendChild(smileyCounter)
  emojiBoxCounter.appendChild(thumbsUpCounter)
  emojiBoxCounter.appendChild(thumbsDownCounter)


  const emojiBoxPost = document.createElement('div')
  const imgSmiley = document.createElement('img')
  const imgThumbsUp = document.createElement('img')
  const imgThumbsDown = document.createElement('img')

  imgSmiley.src = "assets/img/smileyface.png"
  imgThumbsUp.src = "assets/img/thumbsup.png"
  imgThumbsDown.src = "assets/img/thumbsdown.png"


  emojiBoxPost.classList.add('emoji-box')
  emojiBoxContainer.appendChild(emojiBoxPost)
  emojiBoxPost.appendChild(imgSmiley)
  emojiBoxPost.appendChild(imgThumbsUp)
  emojiBoxPost.appendChild(imgThumbsDown)
  imgSmiley.id = `smiley${ID}`
  imgThumbsUp.id = `like${ID}`
  imgThumbsDown.id = `dislike${ID}`



  const giphyBoxContainer = document.createElement('div')
  giphyBoxContainer.classList.add('giphy-box-container')
  buttonBarPost.appendChild(giphyBoxContainer)
  const giphySearchTitle = document.createElement('div')
  giphySearchTitle.classList.add('giphy-search-title')
  const giphyTitleText = document.createTextNode('Giphy Search')
  const giphySearchInput = document.createElement('input')
  const giphyButton = document.createElement('button')
  const searchText = document.createTextNode('Go')
  giphyBoxContainer.appendChild(giphySearchTitle)
  giphySearchTitle.appendChild(giphyTitleText)
  const giphyBuffer = document.createElement('div')
  giphyBuffer.classList.add('giphy-buffer')
  giphyBoxContainer.appendChild(giphyBuffer)
  giphyBoxContainer.appendChild(giphySearchInput)
  giphyBoxContainer.appendChild(giphyButton)
  giphyButton.appendChild(searchText)

  const buttonReply = document.createElement('button')
  const replyText = document.createTextNode('Reply')
  buttonReply.id = `button${ID}`
  buttonReply.classList.add('button-post')
  buttonReply.classList.add('reply-button')
  buttonReply.appendChild(replyText)
  buttonBarPost.appendChild(buttonReply)


  imgSmiley.addEventListener('click', e => {
    smileyServer(e)
    fetchContent("reaction", (e.target.id).slice(6))
  })
  
  imgThumbsUp.addEventListener('click', e => {
    likeServer(e)
    fetchContent("reaction", (e.target.id).slice(4))
  })
  
  imgThumbsDown.addEventListener('click', e => {
    dislikeServer(e)
    fetchContent("reaction", (e.target.id).slice(7))
  })




  buttonReply.addEventListener(`click`, (e) => {
    commentServer(e)
    fetchContent("comment", (e.target.id).slice(6))
  })



}






async function FetchComment(key, value, ID)  {
  let comment = (key.toString() + ": " + value.toString())
  var isComment = key.includes("Comment")
  if (isComment && value){
    console.log(comment)
    document.querySelector(`#commentbox${ID + 1}`).textContent += `      ${comment}` ;
  }
}



const likeServer = e => {
  let index = ((e.target.id).slice(4))
  fetch(`https://mock-zuckerberg.herokuapp.com/${index}` , {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      like_count: "1"
    })
  }).then(res => {
    return res.json()
  })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR')) 
}

const smileyServer = e => {
  let index = ((e.target.id).slice(6))
  fetch(`https://mock-zuckerberg.herokuapp.com/${index}` , {
    method: 'PATCH',
    headers: {
      smiley_count: "1"
    }, 
    body: JSON.stringify({
      comment: document.querySelector(`#textbox${index}`).value 
    })
  }).then(res => {
    return res.json()
  })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR')) 
}

const dislikeServer = e => {
  let index = ((e.target.id).slice(7))
  fetch(`https://mock-zuckerberg.herokuapp.com/${index}` , {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      dislike_count: "1"
    })
  }).then(res => {
    return res.json()
  })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR')) 
}
