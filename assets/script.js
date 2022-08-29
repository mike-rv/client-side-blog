const smileyEmoji = document.querySelector('.smiley-emoji')
const thumbsUpEmoji = document.querySelector('.thumbs-up-emoji')
const thumbsDownEmoji = document.querySelector('.thumbs-down-emoji')

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
