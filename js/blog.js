'use strict'

import { ValidationName, errosMessage } from './form.js'

const formBlog = document.getElementById('blog')
const formBlogInputs = formBlog.getElementsByTagName('input')
const regTitle = /[a-zA-Zа-яА-Я]{3,25}/
const regText = /[a-zA-Zа-яА-Я]{3,100}/
formBlogInputs[0].addEventListener('change', ValidationName(errosMessage[4], regTitle))
formBlogInputs[1].addEventListener('change', ValidationName(errosMessage[5], regText))

const createNewPost = (post) => {
    const newPosts = document.createElement('div')
    newPosts.classList.add('asnwer')

    post.forEach(item => {

        newPosts.innerHTML += `
        <div class="asnwer__item">
            <div class="asnwer__item__title">
                ${item.title}  
            </div>

            <div class="asnwer__item__text">
                Decription : ${item.text}  
            </div>

            <div class="asnwer__item__text">
                Date : ${item.date}  
            </div>

        </div>
        `
    });

    document.querySelector('.blog-answer-field').append(newPosts)
}

const posts = [
    {
        title: 'New Live',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores repellat facere ut. Et, voluptatum nobis?',
        date: '09/10/2018'
    },
    {
        title: 'A My Live',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores repellat facere ut. Et, voluptatum nobis?',
        date: '11/10/2018'
    }
]

createNewPost(posts)

const createNewPostObj = () => {
    const date = new Date
    const post = {
        title: formBlog[0].value,
        text: formBlog[1].value,
        date: date
    }
    posts.push(post)
}

// Remove
const removeAnswers = () => {
    const answers = document.getElementsByClassName('asnwer')
    for (let answer of answers) {
        answer.remove()
    }
}
// Search Post
const inputSeach = document.querySelector('.blog__search')
inputSeach.addEventListener('input', (e) => {
    if (e.target.value == '') {
        removeAnswers()
        createNewPost(posts)
    }

    else {
        const filterPost = posts.filter(item => {
            if (item.title.toLowerCase().indexOf(e.target.value) != -1) {
                return item
            }
        })
        removeAnswers()
        createNewPost(filterPost)
    }
})

// Sort ABC 
let flag = true
const btnSortAbc = document.querySelector('.sort-abc')
btnSortAbc.addEventListener('click', () => {

    const filterABC = posts.sort((a, b) => {

        if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
            return -1
        }
        if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
            return 1
        }
        return 0
    })

    // removeAnswers()
    // createNewPost(filterABC)
    if (flag) {
        const filterABC = posts.sort((a, b) => {

            if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
                return -1
            }
            if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
                return 1
            }
            return 0
        })

        removeAnswers()
        createNewPost(filterABC)
    }

    else {
        const filterCBA = posts.sort((a, b) => {

            if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
                return -1
            }
            if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
                return 1
            }
            return 0
        })
        removeAnswers()
        createNewPost(filterCBA)
    }

    flag = !flag
})

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
                createNewPostObj()
                removeAnswers()
                createNewPost(posts)
                break
            }
        }
    }
})
