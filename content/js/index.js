const firstnameInput = document.querySelector('.firstname')
const lastnameInput = document.querySelector('.lastname')
const usernameInput = document.querySelector('.username')
const passwordInput = document.querySelector('.password')
const submit = document.querySelector('.submit')

submit.addEventListener('click', (event) => {
    event.preventDefault();

    const newUSerInfo = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        username: usernameInput.value,
        password: passwordInput.value,

    }

    fetch('http://localhost:3000/api/user-list/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUSerInfo)
    }).then(res => res.json())
        .then(data => {
            console.log(data)
        })
        empetyInput()

})

function empetyInput() {
    firstnameInput.value = ''
    lastnameInput.value = ''
    usernameInput.value = ''
    passwordInput.value = ''

}