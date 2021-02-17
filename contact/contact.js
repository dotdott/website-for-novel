const form = document.querySelector('form');
const sucessMessage = document.querySelector('.modal');

const username = document.querySelector('#username');
const usermail = document.querySelector('#usermail');
const contactReason = document.querySelector('#contact-reason');
const contactDescription = document.querySelector('#description');


form.addEventListener('submit', ContactMessage);

function ContactMessage(e) {
    e.preventDefault();

    sucessMessage.classList.add('active');
    sucessMessage.focus();

    username.value = '';
    usermail.value = '';
    contactDescription.value = '';
}

window.addEventListener('keydown', e => {
    if(sucessMessage.classList.contains('active')){
        if(e.key === 'Escape'){
            sucessMessage.classList.remove('active');
        };
    };
});

window.addEventListener('click', e => {
    if(!document.querySelector('.modal h1').contains(e.target)){
        sucessMessage.classList.remove('active');
    };
})

document.querySelector('.modal span')
.addEventListener('click', () => {
    sucessMessage.classList.remove('active')

});
