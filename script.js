const form = document.querySelector('.form-form')
const formInputs = form.getElementsByTagName('input')

// Validation
const regName = /^[a-zA-Zа-яА-Я]+$/ui
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const regDate = /(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[ \/\.\-]/

const errosMessage = [
    'Your First Name must be one word and no numbers',
    'Your Last Name must be one word and no numbers',
    'Your mail should probably be at example@mail.com',
    'The date must be in the form'

]

const ValidationName = (errorMessage, reg) => (event) => {
    const errorDiv = document.createElement('div')
    errorDiv.classList.add('error-input');
    const isContaint = event.target.nextElementSibling?.classList.contains('error-input')

    if (!reg.test(event.target.value)) {
        event.target.classList.remove('border-green')
        event.target.classList.add('border-red')
        event.target.value = ''
        errorDiv.innerHTML = errorMessage

        if (!isContaint) {
            event.target.after(errorDiv)
        }
    }

    else if (reg.test(event.target.value)) {

        event.target.classList.remove('border-red')
        event.target.classList.add('border-green')
        event.target.value = event.target.value[0].toUpperCase() + event.target.value.slice(1)

        if (isContaint) {
            event.target.nextElementSibling.remove()
        }
    }

}

formInputs[0].addEventListener('change', ValidationName(errosMessage[0], regName))
formInputs[1].addEventListener('change', ValidationName(errosMessage[1], regName))
formInputs[2].addEventListener('change', ValidationName(errosMessage[2], regEmail))
formInputs[3].addEventListener('change', ValidationName(errosMessage[3], regDate))






