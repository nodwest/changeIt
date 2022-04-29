'use strict'

import { ValidationName, errosMessage } from './form.js'

const formBlog = document.getElementById('blog')
const formBlogInputs = formBlog.getElementsByTagName('input')

const regTitle = /[a-zA-Zа-яА-Я]{3,25}/
const regText = /[a-zA-Zа-яА-Я]{3,100}/
formBlogInputs[0].addEventListener('change', ValidationName(errosMessage[4], regTitle))
formBlogInputs[1].addEventListener('change', ValidationName(errosMessage[5], regText))

const blogTitle = document.querySelector('.blog__title')

const createNewPost = () => {
    const newPost = document.createElement('div')
    newPost.classList.add('asnwer__item')

    newPost.innerHTML = `
    <div class="asnwer__item__title">
         ${formBlogInputs[0].value}  
    </div>

    <div class="asnwer__item__text">
        ${formBlogInputs[1].value}  
    </div>
    `
    document.querySelector('.blog-answer-field').append(newPost)
}

const posts = [
    {
        title : 'any title',
        text : 'any text'
    }
] 

const createNewPostObj = () => {
    const post = {
        title : formBlog[0].value,
        text : formBlog[1].value
    }
    posts.push(post)
}

// ADD NEW POST
formBlogInputs[2].addEventListener('click', (e) => {
    e.preventDefault()
    let count = 0;
    for (let i = 0; i < formBlog.length; i++) {

        if (formBlog[i].getAttribute('type') != 'submit') {

            if (formBlog[i].value == '') {
                formBlog[i].classList.add('border-red')
            }
            else if (formBlog[i].value != '') {
                ++count
            }
            if (count == formBlog.length - 1) {
                createNewPost() 
                createNewPostObj()
                console.log(posts)
                break
            }
        }
    }
})
