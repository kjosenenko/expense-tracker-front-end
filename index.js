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
    formDiv.innerHTML = `
        <form id="transaction-form" class="col-6 bg-primary">
            <br>
            <h4>New Transaction</h4>
            <div>
                <label class="col-3"> Amount </label>
                <input class="col-7" type="number" name="amount" id="transaction-amount">
            </div>
            <div>
                <label class="col-3"> Description </label>
                <input class="col-7" type="text" name="description" id="transaction-description">
            </div>
            <div>
                <label class="col-3"> Account Type </label>
                <select class="form-select col-7" name="transaction_type_id" id="transaction-type-id">
                </select>
            </div>
            <input class="btn btn-light" type="submit" value="Add Transaction" id="transaction-submit">
            <br><br>
        </form>
    `
    const form = document.getElementById("transaction-form")
    const select = document.getElementById("transaction-type-id")
    let types = TransactionType.all;
    types.forEach(element => {
        let option = document.createElement("option");
        option.value = `${element.id}`;
        option.innerText = `${element.category}`;
        select.appendChild(option);
    })
    form.addEventListener("submit", handleSubmit);
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
