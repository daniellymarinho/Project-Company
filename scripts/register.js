import { createUser } from "./requests.js";

const form = document.querySelector('#user-form')
const inputs = document.querySelectorAll(".field")


form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const newUser = {}
  inputs.forEach(input => {
    newUser[input.name] = input.value
    window.location.replace('/pages/login.html')
  })
  
  try {
    await createUser(newUser)

  } catch (error) {
    console.log(error.response.body)
  }

})

const button = document.querySelector("#reset-button")
const buttonLogin = document.querySelector("#login-button__two")
const homePage = document.querySelector("#home-page")

button.addEventListener("click", () => {
  window.location.replace('/pages/index.html')
})

buttonLogin.addEventListener("click", () => {
  window.location.replace('/pages/login.html')
})

homePage.addEventListener("click", () => {
  window.location.replace('/pages/index.html')
})