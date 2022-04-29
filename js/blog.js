'use strict'

import {ValidationName, errosMessage } from './form.js'

const formBlog = document.getElementById('blog')
const formBlogInputs = formBlog.getElementsByTagName('input')

const regTitle = /[a-zA-Zа-яА-Я]/
const regText = /[a-zA-Zа-яА-Я]{3,100}/
formBlogInputs[0].addEventListener('change', ValidationName(errosMessage[4], regTitle))
formBlogInputs[1].addEventListener('change', ValidationName(errosMessage[5], regText))

formBlogInputs[2].addEventListener('click', (e)=> {
    e.preventDefault()

    

})
