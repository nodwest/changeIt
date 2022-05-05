'use strict'

const form = document.getElementById('form')
const formInputs = form.getElementsByTagName('input')

// Validation
const regName = /^[a-zA-Zа-яА-Я]+$/ui
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const regDate = /(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[ \/\.\-]/

export const errorsMessage = {
    errorName: 'Your First Name must be one word and no numbers',
    errorLastName: 'Your Last Name must be one word and no numbers',
    errorEmail: 'Your mail should probably be at example@mail.com',
    errorDate: 'The date must be in the form DD/MM/YYYY',
    errorTitle: 'Your title must not start with numbers or string length can be from 3 to 100 characters',
    errorStringLength: 'The string length can be from 3 to 100 characters'
}

export const validate = (errorMessage, reg) => (event) => {
    const errorDiv = document.createElement('div')
    errorDiv.classList.add('error-input')
    const isContaint = event.target.nextElementSibling?.classList.contains('error-input')

    const incorrectAnswer = (err = errorMessage) => {
        event.target.classList.remove('border-green')
        event.target.classList.add('border-red')
        event.target.value = ''
        errorDiv.innerText = err
        if (!isContaint) {
            event.target.after(errorDiv)
        }
    }

    const correctAnswer = () => {
        event.target.classList.remove('border-red')
        event.target.classList.add('border-green')
        event.target.value = event.target.value[0].toUpperCase() + event.target.value.slice(1)
        if (isContaint) {
            event.target.nextElementSibling.remove()
        }
    }

    if (!reg.test(event.target.value)) {
        incorrectAnswer()
    }

    else if (reg.test(event.target.value)) {
        correctAnswer()
    }

    // Date Validation
    if (event.target.name === 'date') {
        let date = event.target.value
        date = date.slice(6) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2)
        date = Date.parse(date).toString().slice(0, 5)
        const nowDate = Date.parse(new Date()).toString().slice(0, 5)

        if (+date < +nowDate) {
            incorrectAnswer('Сannot be scheduled for today or previously')
        }
    }
}

formInputs[0].addEventListener('change', validate(errorsMessage.errorName, regName))
formInputs[1].addEventListener('change', validate(errorsMessage.errorLastName, regName))
formInputs[2].addEventListener('change', validate(errorsMessage.errorEmail, regEmail))
formInputs[3].addEventListener('change', validate(errorsMessage.errorDate, regDate))

formInputs[4].addEventListener('click', (event) => {
    for (let i = 0; i < formInputs.length; i++) {
        if (formInputs[i].getAttribute('type') !== 'submit') {
            if (formInputs[i].value === '') {
                formInputs[i].classList.add('border-red')
                event.preventDefault()
            }
        }
    }
})

// SUBMIT FORM
const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    for (let data of formData.entries()) {
        console.log(data)
    }
}
form.addEventListener('submit', submit)



