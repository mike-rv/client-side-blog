const smileyEmoji = document.querySelector('.smiley-emoji')
const thumbsUpEmoji = document.querySelector('.thumbs-up-emoji')
const thumbsDownEmoji = document.querySelector('.thumbs-down-emoji')
const commentBoxReply = document.querySelector('.comment-box-reply')
const section = document.querySelector('.section')
const buttonPost = document.querySelector('.button-post')
const textArea = document.querySelector('.text-area')

smileyEmoji.addEventListener('click', e => {
    textArea.append(String.fromCodePoint(parseInt(0x1F642)))
})

thumbsUpEmoji.addEventListener('click', e => {
    textArea.append(String.fromCodePoint(parseInt(0x1F44D)))
})

thumbsDownEmoji.addEventListener('click', e => {
    textArea.append(String.fromCodePoint(parseInt(0x1F44E)))
})

buttonPost.addEventListener('click', function(e) {
    const box = document.createElement('div')
    box.style.border = '1px solid grey';
    box.style['min-width'] = '60vw'
    box.style['min-height'] = '400px'
    box.style['justify-content'] = 'center';
    box.style['flex-direction'] = 'column';
    box.style['row-gap'] = '9%';
    box.style['background-color'] = '#e0e0e0';
    box.style['border-radius'] = '50px';
    box.style['padding'] = '1%'
    
    section.appendChild(box)
})
