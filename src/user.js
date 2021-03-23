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

    static renderNewUserForm() {
        formDiv.innerHTML = `
        <form id="user-form" class="col-6 bg-primary">
            <br>
            <h4>New User</h4>
            <div>
                <label class="col-3"> Name </label>
                <input class="col-7" type="text" name="name" id="user-name">
            </div>
            <input class="btn btn-light" type="submit" value="Create" id="user-submit">
            <br><br>
        </form>
    `
        const userForm = document.getElementById('user-form')
        userForm.addEventListener("submit", User.CreateNewUser)
    }

    static CreateNewUser =(e) => {
        e.preventDefault();
        const userInfo = {
            name: e.target[0].value
        }
        fetch(baseUrl + '/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)})
                .then(r => r.json())
                .then(element => {
                        const user = new User(element.id, element.name);
                        user.renderUser();
                        User.currentUser = user.id;
                        APIservice.getTransactions(user.id)
                    });
    }

    static backToAllUsers() {
        mainHeader.innerText = "Select User";
        list.innerText = "";
        buttonArea.innerHTML = "";
        formDiv.innerHTML = "";
        User.currentUser = 0;
        Transaction.all = [];
        User.renderNewUserForm()
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