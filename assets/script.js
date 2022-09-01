const smileyEmoji = document.querySelector('.smiley-emoji')
const thumbsUpEmoji = document.querySelector('.thumbs-up-emoji')
const thumbsDownEmoji = document.querySelector('.thumbs-down-emoji')
const section = document.querySelector('.section')
const buttonPost = document.querySelector('.button-post')
const inputArea = document.querySelector('.input-area')
const historySection = document.querySelector('.comment-history-section')
const replyButton = document.querySelector('.reply-button')

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
    postBoxTemplate(data[i].post, (data[i].id))
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
    postBoxTemplate(data[data.length - 1].post, data[data.length - 1].id);
   }else{
    
    let response = await fetch(`https://mock-zuckerberg.herokuapp.com/${ID}`);
    let data = await response.json();
    let lastValue = data[Object.keys(data)[Object.keys(data).length - 1]];
    let lastKey = Object.keys(data).pop();
    document.querySelector(`#commentbox${ID}`).textContent += (lastKey.toString() + " : " + lastValue.toString())
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

const postBoxTemplate = (post, ID , comment) => {
  const box = document.createElement('div')
  box.classList.add("previous-comments");

  document.querySelector(".container-post-history").prepend(box)


  const innerBox = document.createElement('div')

  innerBox.classList.add("white-background-comments")
  innerBox.textContent = post;

  box.appendChild(innerBox)

  const inputAreaPost = document.createElement('textarea')
  inputAreaPost.classList.add('input-area-post')
  inputAreaPost.id = `textbox${ID}`;
  box.appendChild(inputAreaPost)

  const commentSection = document.createElement('div')
  commentSection.classList.add('white-background-comments')
  commentSection.id = `commentbox${ID}`
  box.appendChild(commentSection);

  const buttonBarPost = document.createElement('div')
  buttonBarPost.classList.add('button-bar-post')
  box.appendChild(buttonBarPost)

  const emojBoxPost = document.createElement('div')
  const imgSmiley = document.createElement('img')
  const imgThumbsUp = document.createElement('img')
  const imgThumbsDown = document.createElement('img')
    
  imgSmiley.src = "assets/img/smileyface.png"
  imgThumbsUp.src = "assets/img/thumbsup.png"
  imgThumbsDown.src = "assets/img/thumbsdown.png"
  emojBoxPost.classList.add('emoji-box-post')
  buttonBarPost.appendChild(emojBoxPost)
  emojBoxPost.appendChild(imgSmiley)
  emojBoxPost.appendChild(imgThumbsUp)
  emojBoxPost.appendChild(imgThumbsDown)
  imgSmiley.id = `smiley${ID}`
  imgThumbsUp.id = `like${ID}`
  imgThumbsDown.id = `dislike${ID}`


  imgSmiley.addEventListener('click', e => {
    smileyServer(e)
  })
  
  thumbsUpEmoji.addEventListener('click', e => {
    likeServer(e)
  })
  
  thumbsDownEmoji.addEventListener('click', e => {
    dislikeServer(e)
  })

  
  const buttonReply = document.createElement('button')
  const replyText = document.createTextNode('Reply')
  buttonReply.id = `button${ID}`
  buttonReply.classList.add('button-post')
  buttonReply.classList.add('reply-button')
  buttonReply.appendChild(replyText)
  buttonBarPost.appendChild(buttonReply)


  buttonReply.addEventListener(`click`, (e) => {
    commentServer(e)
    fetchContent("comment", (e.target.id).slice(6))

  })



}




// async function fetchNewPost() {
//   let response = await fetch('https://mock-zuckerberg.herokuapp.com/');
//   let data = await response.json();
//   postBoxTemplate(data[data.length - 1].post)
// }



async function FetchComment(key, value, ID)  {
  let comment = (key.toString() + ": " + value.toString())
  var isComment = key.includes("Comment")
  if (isComment && value){
    console.log(comment)
    document.querySelector(`#commentbox${ID + 1}`).textContent += `  ${comment}` ;
  }
}



const likeServer = e => {
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

const smileyServer = e => {
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

const dislikeServer = e => {
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
