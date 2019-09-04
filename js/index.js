document.addEventListener("DOMContentLoaded", function() {
allBooks()
//create variables
const listPanel = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
//add eventlistener
listPanel.addEventListener('click', showBooks)
showPanel.addEventListener('click', likeBooks)

//talk to server using fetch
function allBooks() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(lists)
}

function btnHandler(bookId) {
    return fetch(`http://localhost:3000/books/${bookId}`)
    .then(res => res.json())
    .then(bookObj => disPlaySingleBook(bookObj))

}

// function fetchLikeBooks(bookId) {
//     return fetch(`http://localhost:3000/books/${bookId}`, {
//         method: "PATCH",
//         headrs: {'Content-Type': 'application/json'},
//         body: JSON.stringify({users: })
//     })
// }


//LOGIC/DOM manipulation
function lists(data) {
    data.forEach(book => {
        listPanel.innerHTML += `<li class="bookSpan" data-book-id=${book.id}>${book.title}</li>`
    }) 
}
function showBooks(event) {
    if(event.target.className === "bookSpan") {
        let bookId = event.target.dataset.bookId
         
        btnHandler(bookId)
    }
}

function disPlaySingleBook(bookObj) { 

    showPanel.innerHTML = `<li> 
    <h3>${bookObj.title}</h3>
    <img src=${bookObj.img_url}>
    <p>${bookObj.description}</p>
    <div class="users-list")
    ${bookObj.users.map(user => `<p class="users" data-user-id=${user.id}>${user.username}</p>`).join(' ')}
    </div>
    <button class="likeBtn" data-book-id=${bookObj.id}>Read Book</button>
    </li>`
}

function likeBooks(event) {
    debugger 
    if(event.target.className === "likeBtn") {
        let bookId = event.target.dataset.bookId
        let userId = event.target.dataset
        fetchLikeBooks(bookId)
    }
}

})


