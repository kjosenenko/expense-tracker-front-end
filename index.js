const baseUrl = "http://localhost:3000"
const mainHeader = document.getElementById("mainHeader")
const list = document.getElementById("list")
const formDiv = document.getElementById("form-div")
document.addEventListener("DOMContentLoaded", init)


function init() {
    getUsers();
    getTransactionTypes();
}

function getUsers() {
    mainHeader.innerText = "Select User"
    list.innerText = ""
    fetch(baseUrl + `/users`)
        .then(r => r.json())
        .then(data => {
            data.forEach(element => {
                let user = new User(element.id, element.name);
                user.renderUser();
            });
        })
}

function getTransactions(user_id) {
    mainHeader.innerText = `${User.returnUserName(user_id)}'s Transactions`
    Transaction.renderEmptyForm();
    list.innerText = "";
    fetch(baseUrl + `/users/${user_id}/transactions`)
        .then(r => r.json())
        .then(data => {
            data.forEach(element => {
                let transaction = new Transaction(element.id, element.amount, element.description, element.created_at, element.user_id, element.transaction_type_id);
                transaction.renderTransaction();
            });
        })
}

function getTransactionTypes() {
    fetch(baseUrl + `/transaction_types`)
        .then(r => r.json())
        .then(data =>{
            data.forEach(element => {
                new TransactionType(element.id, element.category);
            });
        })

}

function handleSubmit(e) {
    e.preventDefault();
    const transactionInfo = {
        amount: e.target[0].value,
        description: e.target[1].value,
        transaction_type_id: e.target[2].value,
    }
    fetch(baseUrl + `/users/${User.currentUser}/transactions`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionInfo)
    })
        .then(r => r.json())
        .then(element => {
            let transaction = new Transaction(element.id, element.amount, element.description, element.created_at, element.user_id, element.transaction_type_id);
            transaction.renderTransaction();
        })

}

function handleDeleteTransaction(transaction_id) {
    fetch(baseUrl + `/users/${User.currentUser}/transactions/${transaction_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(r => {
            if (r.status == 200) {
                let index = Transaction.all.findIndex(t => {return t.id === transaction_id});
                Transaction.all.splice(index, 1);
                list.innerText = "";
                Transaction.all.forEach(t => {t.renderTransaction()})
            }
        })
}
