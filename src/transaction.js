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

    renderTransaction() {
            let li = document.createElement("li");
            li.innerHTML = `${Transaction.formattedDate(this.created_at)} <small>${TransactionType.returnType(this.transaction_type_id)}:</small> <b>$${this.amount}</b> - ${this.description}. `;
            let editButton = document.createElement("button");
            editButton.className = 'btn btn-outline-info show-expense';
            editButton.innerText = 'edit';
            li.append(editButton);
            editButton.addEventListener("click", this.showTransaction);
            let deleteButton = document.createElement("button");
            deleteButton.className = 'btn btn-outline-danger show-expense';
            deleteButton.innerText = 'delete';
            li.append(deleteButton);
            deleteButton.addEventListener("click", this.deleteTransaction);
            list.appendChild(li);
    }

    static formattedDate(dateString) {
        let date = new Date(dateString);
        return (date.getMonth()+1) + '/'+date.getDate()+'/' +date.getFullYear();
    }

    showTransaction = (e) => {
        console.log(`edit ${this.id}`);
    }

    deleteTransaction = (e) => {
        console.log(`delete ${this.id}`);
    }
}
