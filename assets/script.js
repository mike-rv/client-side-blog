const smileyEmoji = document.querySelector('.smiley-emoji')
const thumbsUpEmoji = document.querySelector('.thumbs-up-emoji')
const thumbsDownEmoji = document.querySelector('.thumbs-down-emoji')
const section = document.querySelector('.section')
const buttonPost = document.querySelector('.button-post')
const inputArea = document.querySelector('.input-area')

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


    // innerBox.append('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum id eum consequatur inventore ducimus culpa quia, impedit minima beatae voluptatem voluptate vero ea cum, praesentium similique natus ipsam eius. Nisi, exercitationem, praesentium minus eveniet tempora fugiat quos doloribus nam corporis esse assumenda labore laudantium totam ipsam beatae saepe maiores pariatur atque illo deserunt iusto cupiditate? Nihil, nesciunt obcaecati dolore ipsam repellat veniam laborum? Earum molestias, cum sint provident assumenda enim eius! Quos distinctio optio eveniet quaerat totam, laboriosam iusto quasi eum vel corporis debitis esse, neque error! Dignissimos facere molestiae ipsa optio itaque fugiat. Quo dignissimos natus sint itaque autem.')
})


