class User {

    static all = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;
        User.all.push(this)
    }

    renderUser() {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.className = 'btn btn-light show-user';
        button.id = this.id;
        button.innerText = this.name;
        li.append(button);
        list.appendChild(li);
        button.addEventListener("click", this.doThis);
    }

    doThis() {
        console.log('clicked');
    }

}