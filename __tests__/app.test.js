// const request = require('supertest');
// const app = require('../assets/script')

// const fs = require('fs');
// const path = require('path');
// const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');



// describe('index.html', () => {
//     beforeEach(() => {
//         document.documentElement.innerHTML = html.toString();
//     })  
// })

const renderDOM = require('./helpers');

let dom;
let document;


describe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('index.html');
    document = await dom.window.document;
  })


it('it has a title', () => {
    const title = document.querySelector('.header-title');
    expect(title).toBeTruthy()
})

it('h1 shows fakebook title when page loads', ()=> {
    const h1 = document.querySelector('h1');
    expect(h1.innerHTML).toBe('Fakebook');
})

it('there is a form', () => {
    const form = document.querySelector('form');
    expect(form).toBeTruthy()
})

it('has a prevous posts section', () => {
    const prevPosts = document.querySelector('.history-title');
    expect(prevPosts.innerHTML).toContain('Previous Posts');
})

})
