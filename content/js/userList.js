const modal = document.querySelector('.modal')
const userListWrapper = document.querySelector('.user-list-wrapper')
let userID = null;
window.addEventListener('load', () => {

    getUSerList()

})

function getUSerList() {

    fetch('http://localhost:3000/api/user-list/')
        .then(res => res.json())
        .then(data => {
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
                    <button class="edit-icon"><i class="fa-solid fa-pen-to-square"></i></button>
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