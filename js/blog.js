'use strict'

import { validate, errorsMessage } from './form.js'

const formBlog = document.getElementById('blog')
const formBlogInputs = formBlog.getElementsByTagName('input')
const regTitle = /[a-zA-Zа-яА-Я]{3,25}/
const regText = /[a-zA-Zа-яА-Я]{3,100}/
formBlogInputs[0].addEventListener('change', validate(errorsMessage.errorTitle, regTitle))
formBlogInputs[1].addEventListener('change', validate(errorsMessage.errorStringLength, regText))

const renderPost = (post) => {
    const newPosts = document.createElement('div')
    newPosts.classList.add('asnwer')
    post.forEach(item => {
        newPosts.innerHTML += `
        <div class="asnwer__item">
            <div class="asnwer__item__title">
                ${item.title}   
            </div>

            <div class="asnwer__item__text">
                 ${item.text}  
            </div>

            <div class="asnwer__item__date">
                Date : ${item.date}  
            </div>
        </div>
        `
    });
    document.querySelector('.blog-answer-field').append(newPosts)
}
const posts = []
let filterPosts = []
let localArray = []

const createNewPostObj = () => {
    const newDate = new Date().toDateString()
    const dateParse = new Date().getTime()
    const post = {
        title: formBlog[0].value,
        text: formBlog[1].value,
        date: newDate,
        dateParse: dateParse
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
// class Blog {
//     constructor(option) {
//         this.posts = option.posts
//         this.inputSearch = option.inputSearch
//         this.sortAbc = option.sortAbc
//         this.sortDate = option.sortDate
//     }
// }
// Сreate a new comparison object 
const createNewObjToLocal = () => {
    return {
        posts: filterPosts,
        inputSearch: document.querySelector('.blog__search').value,
        sortAbc: flagABC,
        sortDate: flagDate,
    }
}
// Search Post
const inputSeach = document.querySelector('.blog__search')
inputSeach.addEventListener('input', (e) => {

    if (e.target.value === '') {
        removeAnswers()
        renderPost(posts)
        filterPosts = [...posts]
    }

    else {
        filterPosts = posts.filter(item => {
            if (item.title.toLowerCase().indexOf(e.target.value.toLocaleLowerCase()) != -1) {
                return item
            }
        })

        const comparisonObj = createNewObjToLocal()

        for (let i = 0; i < localArray.length; i++) {
            
            if (JSON.stringify(comparisonObj) == JSON.stringify(localArray[i])) {
                filterPosts = localArray[i].posts
                break
            }
        }
        removeAnswers()
        renderPost(filterPosts)
    }
})

// SAVE TO LOCAL STORAGE
inputSeach.addEventListener('change', () => {
    const comparisonObj = createNewObjToLocal()

    if (localStorage.getItem('arrayPosts') !== null) {
        localArray = JSON.parse(localStorage.getItem('arrayPosts'))
    }

    if (localArray.length === 0) {
        localArray.push(
            createNewObjToLocal()
        )
    }

    for (let i = 0; i < localArray.length; i++) {
        if (JSON.stringify(comparisonObj) === JSON.stringify(localArray[i])) {
            break
        }
        else if (i + 1 === localArray.length) {
            localArray.push(
                createNewObjToLocal()
            )
            break
        }
    }
    localStorage.removeItem('arrayPosts')
    localStorage.setItem('arrayPosts', JSON.stringify(localArray))
})

// Sort ABC 
let flagABC = false
let flagDate = false
const btnSortAbc = document.querySelector('.sort-abc')
btnSortAbc.addEventListener('click', () => {

    if (flagABC) {
        const filterABC = filterPosts.sort((a, b) => {
            if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
                return -1
            }
            if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
                return 1
            }
            return 0
        })
        removeAnswers()
        renderPost(filterABC)

    } else {
        const filterCBA = filterPosts.sort((a, b) => {
            if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
                return -1
            }
            if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
                return 1
            }
            return 0
        })
        removeAnswers()
        renderPost(filterCBA)
    }
    flagABC = !flagABC
})

//SORT DATE 
const btnSortDate = document.querySelector('.sort-date')
btnSortDate.addEventListener('click', () => {
    if (flagDate) {
        const filterDate = filterPosts.sort((a, b) => {
            return a.dateParse - b.dateParse
        })
        removeAnswers()
        renderPost(filterDate)
    } else {
        const filterDate = filterPosts.sort((a, b) => {
            return b.dateParse - a.dateParse
        })
        removeAnswers()
        renderPost(filterDate)
    }
    flagDate = !flagDate
})

// ADD NEW POST
formBlogInputs[2].addEventListener('click', (e) => {
    e.preventDefault()
    let isNotEmptyInput = true;
    for (let i = 0; i < formBlog.length; i++) {
        if (formBlog[i].getAttribute('type') != 'submit') {
            if (formBlog[i].value === '') {
                formBlog[i].classList.add('border-red')
                isNotEmptyInput = false
            }
        }
    }
    if (isNotEmptyInput) {
        createNewPostObj()
        removeAnswers()
        renderPost(posts)
        filterPosts = [...posts]
    }
})
