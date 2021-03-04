class Transaction {

    static all = []

    constructor(id, amount, description, created_at, user, type) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.created_at = created_at;
        this.user = user;
        this.type = type;
        Transaction.all.push(this);
    }

    renderTransaction() {
            let li = document.createElement("li");
            // let button = document.createElement("button");
            // button.className = 'btn btn-light show-user';
            // button.id = user.id;
            // button.innerText = user.name;
            li.innerText = `${this.created_at} - $${this.amount}`;
            // li.append(button);
            outputList.appendChild(li);
            // button.addEventListener("click", console.log('click'));
    }
}

    // let li = document.createElement("li");
    //     let button = document.createElement("button");
    //     button.className = 'btn btn-light show-user';
    //     button.id = this.id;
    //     button.innerText = this.name;
    //     li.append(button);
    //     usersList.appendChild(li);
    //     button.addEventListener("click", getTransactions(this.id));