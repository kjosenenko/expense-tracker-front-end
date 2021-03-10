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

    static renderLoginAndSignupForms() {
        mainHeader.innerText = "Welcome, Please Login or Sign Up."
        formDiv.innerHTML = `
            <form id="login-form" class="col-6 bg-primary">
                <br>
                <h4>Login</h4>
                <div>
                    <label class="col-3"> Username </label>
                    <input class="col-7" type="text" name="username" id="login-username">
                </div>
                <div>
                    <label class="col-3"> Password </label>
                    <input class="col-7" type="password" name="password" id="login-poassword">
                </div>
                <input class="btn btn-light" type="submit" value="Login" id="login-submit">
                <br><br>
            </form>
            <br>
            <form id="signup-form" class="col-6 bg-primary">
                <br>
                <h4>Sign Up</h4>
                <div>
                    <label class="col-3"> Username </label>
                    <input class="col-7" type="text" name="username" id="signup-username">
                </div>
                <div>
                    <label class="col-3"> Password </label>
                    <input class="col-7" type="password" name="password" id="signup-poassword">
                </div>
                <input class="btn btn-light" type="submit" value="Sign Up" id="signup-submit">
                <br><br>
            </form>
        `
        const loginForm = document.getElementById("login-form");
        loginForm.addEventListener("submit", APIservice.login);
        const signupForm = document.getElementById("signup-form");
        signupForm.addEventListener("submit", APIservice.signup);
    }

    showTransactions = (e) => {
        User.currentUser = this.id;
        APIservice.getTransactions(this.id);
    }

    static returnUserName(user_id) {
        let user = User.all.filter(u => {
            return u.id === user_id;
        })
        return user[0].name;
    }

}