class User {

    static all = [];
    static currentUser = 0;

    constructor(id, name) {
        this.id = id;
        this.name = name;
        User.all.push(this)
    }

    renderUser() {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.className = 'btn btn-light show-user';
        button.innerText = this.name;
        li.append(button);
        list.appendChild(li);
        button.addEventListener("click", this.showTransactions);
    }

    showTransactions = (e) => {
        User.currentUser = this.id;
        getTransactions(this.id);
    }

    static returnUserName(user_id) {
        let user = User.all.filter(u => {
            return u.id === user_id;
        })
        return user[0].name;
    }

}