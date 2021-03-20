class User {

    static all = [];
    static currentUser = 0;

    constructor(id, name) {
        this.id = id;
        this.name = name;
        User.all.push(this)
    }

    renderUser() {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.className = 'btn btn-light';
        button.innerText = this.name;
        li.append(button);
        list.appendChild(li);
        button.addEventListener("click", this.showTransactions);
    }

    static backToAllUsers() {
        mainHeader.innerText = "Select User";
        list.innerText = "";
        buttonArea.innerHTML = "";
        formDiv.innerHTML = "";
        User.currentUser = 0;
        Transaction.all = [];
        User.all.forEach(u => {u.renderUser()});
    }

    static renderBackToAllusersButton() {
        const button = document.createElement("button");
        button.className = 'btn-secondary btn';
        button.innerText = 'Back to Select User';
        button.addEventListener("click", User.backToAllUsers);
        buttonArea.appendChild(button);
    }

    showTransactions = (e) => {
        User.currentUser = this.id;
        APIservice.getTransactions(this.id);
    }

    static returnUserName(user_id) {
        const user = User.all.filter(u => {
            return u.id === user_id;
        })
        return user[0].name;
    }

}