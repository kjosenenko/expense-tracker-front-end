const baseUrl = "http://localhost:3000"
const mainHeader = document.getElementById("mainHeader")
const list = document.getElementById("list")
const formDiv = document.getElementById("form-div")
const buttonArea = document.getElementById("buttonArea")
document.addEventListener("DOMContentLoaded", init)


function init() {
    APIservice.getUsers();
    APIservice.getTransactionTypes();
}
