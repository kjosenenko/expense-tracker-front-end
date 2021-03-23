class APIservice {

    // GET

    static getUsers() {
        mainHeader.innerText = "Select User"
        list.innerText = ""
        fetch(baseUrl + `/users`)
            .then(r => r.json())
            .then(data => {
                data.forEach(element => {
                    const user = new User(element.id, element.name);
                    user.renderUser();
                });
            })
        User.renderNewUserForm()
    }

    static getTransactions(user_id) {
        mainHeader.innerText = `${User.returnUserName(user_id)}'s Transactions`
        User.renderBackToAllusersButton();
        Transaction.renderEmptyForm();
        list.innerText = "";
        fetch(baseUrl + `/users/${user_id}/transactions`)
            .then(r => r.json())
            .then(data => {
                data.forEach(element => {
                    const transaction = new Transaction(element.id, element.amount, element.description, element.created_at, element.user_id, element.transaction_type_id);
                    transaction.renderTransaction();
                });
            })
    }
    
    static getTransactionTypes() {
        fetch(baseUrl + `/transaction_types`)
            .then(r => r.json())
            .then(data =>{
                data.forEach(element => {
                    new TransactionType(element.id, element.category);
                });
            })
    
    }

    // POST

    static postTransactionToDB(e) {
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
                const transaction = new Transaction(element.id, element.amount, element.description, element.created_at, element.user_id, element.transaction_type_id);
                transaction.renderTransaction();
                Transaction.renderEmptyForm();
            })
    }

    // PATCH

    static updateTransactionOnDB(e, transaction_id) {
        const transactionInfo = {
            amount: e.target[0].value,
            description: e.target[1].value,
            transaction_type_id: e.target[2].value,
        }
        fetch(baseUrl + `/users/${User.currentUser}/transactions/${transaction_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionInfo)
        })
            .then(r => {
                if (r.status == 200) {
                    const index = Transaction.all.findIndex(t => {return t.id === transaction_id});
                    const transaction = Transaction.all[index];
                    transaction.amount = e.target[0].value;
                    transaction.description = e.target[1].value;
                    transaction.transaction_type_id = e.target[2].value;
                    Transaction.reloadTransactions();
                }
            })
    }

    // DELETE

    static deleteTransactionFromDB(transaction_id) {
        fetch(baseUrl + `/users/${User.currentUser}/transactions/${transaction_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(r => {
                if (r.status == 200) {
                    const index = Transaction.all.findIndex(t => {return t.id === transaction_id});
                    Transaction.all.splice(index, 1);
                    list.innerText = "";
                    Transaction.all.forEach(t => {t.renderTransaction()});
                }
            })
    }

}