const modal = document.querySelector('.modal')
const editModal = document.querySelector('.edit-modal')
const userListWrapper = document.querySelector('.user-list-wrapper')
const none = document.querySelector('.none')
const firstnameInput = document.querySelector('.firstname')
const lastnameInput = document.querySelector('.lastname')
const usernameInput = document.querySelector('.username')
const passwordInput = document.querySelector('.password')
const editBtn = document.querySelector('.editBtn')
const editClose = document.querySelector('.editClose')
let userID = null;
window.addEventListener('load', () => {

    getUSerList()

})

function getUSerList() {

    fetch('http://localhost:3000/api/user-list/')
        .then(res => res.json())
        .then(data => {
            console.log(data.length);
            if (data.length === 0) {
                none.style.display = 'block'

            }
            userListWrapper.innerHTML = ''
            data.forEach(user => {
                userListWrapper.insertAdjacentHTML('beforeend', `
                <div class="user-info">
                <div class="user-info-right">
                    <img src="./content/img/download.png" alt="user image" class="user-img">
                </div>
                <div class="user-info-left">
                    <h2>
                        <span>${user.firstname}</span>
                        <span>${user.lastname}</span>
                    </h2>
                    <h3>${user.username}</h3>
                </div>
                <div class="user-remove">
                    <button class="delete-icon" onClick="showremoveUserModal('${user.id}')"><i class="fa-solid fa-trash"></i></button>
                    <button class="edit-icon" onClick=showEditModal(${JSON.stringify(user)})><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
            </div>`)

            });

        })
}

function showremoveUserModal(id) {

    userID = id
    modal.classList.add('active')


}
function noBtn() {
    modal.classList.remove('active')
}
function yesBtn() {

    fetch(`http://localhost:3000/api/user-list/${userID}`, {
        method: "DELETE"
    }).then(res => res.json)
        .then(data => {
            console.log(data);
            noBtn()
            getUSerList()
        })

}

function showEditModal(user) {
    userID = user.id
    firstnameInput.value=user.firstname;
    lastnameInput.value=user.lastname;
    usernameInput.value=user.username;
    passwordInput.value=user.password;
    editModal.classList.add('active')

}



editBtn.addEventListener('click', (event) => {
    event.preventDefault()

    let editUser = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
    }
    fetch(`http://localhost:3000/api/user-list/${userID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser)
    }).then(res => res.json())
        .then(data => {
           
            getUSerList()
        })


    editModal.classList.remove('active')

})

editClose.addEventListener('click',()=>{
    editModal.classList.remove('active')

})
