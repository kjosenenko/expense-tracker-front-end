const baseUrl = "http://localhost:3000"
const output = document.getElementById("output")
const list = document.getElementById("list")

document.addEventListener("DOMContentLoaded", init)


function init() {
    getUsers();
}

function getUsers() {
    fetch(baseUrl + `/users`)
        .then(r => r.json())
        .then(data => {
            data.forEach(element => {
                let n = new User(element.id, element.name);
                n.renderUser();
            });
        })
}

function getTransactions(user_id) {
    fetch(baseUrl + `/users/${user_id}/transactions`)
        .then(r => r.json())
        .then(data => {
            data.forEach(element => {
                new Transaction(element.id, element.amount, element.description, element.created_at, element.user, element.type);
            });
        Transaction.renderTransactions(Transaction.all);
        })
}

function getTransactionTypes() {
    fetch(baseUrl + `/transaction_types`)
        .then(r => r.json())
        .then(data => console.log(data))

}
        
// User.renderUsers(User.all) 