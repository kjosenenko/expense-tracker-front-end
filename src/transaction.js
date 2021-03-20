class Transaction {

    static all = []

    constructor(id, amount, description, created_at, user_id, transaction_type_id) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.created_at = created_at;
        this.user_id = user_id;
        this.transaction_type_id = transaction_type_id;
        Transaction.all.push(this);
    }

    static renderEmptyForm() {
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
        const types = TransactionType.all;
        types.forEach(element => {
            const option = document.createElement("option");
            option.value = `${element.id}`;
            option.innerText = `${element.category}`;
            select.appendChild(option);
        })
        form.addEventListener("submit", APIservice.postTransactionToDB);
    }

    renderTransaction() {
            const li = document.createElement("li");
            li.innerHTML = `${Transaction.formattedDate(this.created_at)} <small>${TransactionType.returnType(this.transaction_type_id)}:</small> <b>$${this.amount}</b> - ${this.description}. `;
            const editButton = document.createElement("button");
            editButton.className = 'btn btn-outline-info';
            editButton.innerText = 'edit';
            li.append(editButton);
            editButton.addEventListener("click", this.editTransaction);
            const deleteButton = document.createElement("button");
            deleteButton.className = 'btn btn-outline-danger';
            deleteButton.innerText = 'delete';
            li.append(deleteButton);
            deleteButton.addEventListener("click", this.deleteTransaction);
            list.appendChild(li);
    }

    static formattedDate(dateString) {
        const date = new Date(dateString);
        return (date.getMonth()+1) + '/'+date.getDate()+'/' +date.getFullYear();
    }

    editTransaction = (e) => {
        list.innerText = "";
        buttonArea.innerHTML = "";
        const cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancel";
        cancelButton.className = 'btn btn-outline-secondary';
        cancelButton.addEventListener("click", Transaction.reloadTransactions)
        buttonArea.appendChild(cancelButton);
        formDiv.innerHTML = `
        <form id="transaction-form" class="col-6 bg-primary">
            <br>
            <h4>Transaction ${Transaction.formattedDate(this.created_at)}</h4>
            <div>
                <label class="col-3"> Amount </label>
                <input class="col-7" type="number" name="amount" id="transaction-amount" value="${this.amount}">
            </div>
            <div>
                <label class="col-3"> Description </label>
                <input class="col-7" type="text" name="description" id="transaction-description" value="${this.description}">
            </div>
            <div>
                <label class="col-3"> Account Type </label>
                <select class="form-select col-7" name="transaction_type_id" id="transaction-type-id">
                </select>
            </div>
            <input class="btn btn-light" type="submit" value="Update Transaction" id="transaction-submit">
            <br><br>
        </form>
    `
        const form = document.getElementById("transaction-form")
        const select = document.getElementById("transaction-type-id")
        const types = TransactionType.all;
        types.forEach(element => {
            const option = document.createElement("option");
            option.value = `${element.id}`;
            option.innerText = `${element.category}`;
            if(option.value == this.transaction_type_id) {
                option.selected = true;
            }
            select.appendChild(option);
        })
        form.addEventListener("submit", this.updateTransaction);
    }

    deleteTransaction = (e) => {
        APIservice.deleteTransactionFromDB(this.id);
    }

    updateTransaction = (e) => {
        e.preventDefault();
        APIservice.updateTransactionOnDB(e, this.id);
    }

    static reloadTransactions() {
        buttonArea.innerHTML = "";
        User.renderBackToAllusersButton();
        Transaction.all.forEach(t => {t.renderTransaction()});
        Transaction.renderEmptyForm();
    }
}
