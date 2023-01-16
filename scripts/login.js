import { login, verifyUser } from "./requests.js";
import { getUser, } from "./user.js";

const form = document.querySelector("#login-form")
const inputs = document.querySelectorAll(".field")



form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const loginUser = {}
  inputs.forEach(input => {
    loginUser[input.name] = input.value
  })

  try {
    const log = await login(loginUser)
    localStorage.setItem('user', JSON.stringify(log))


    const user = getUser()
    const {is_admin} = await verifyUser()
    if (is_admin) {
      window.location.replace('/pages/pageAdm.html')
    } else {
      window.location.replace('/pages/pageFun.html')
    }


  } catch (error) {
    console.log(error)
  }
})


const buttonRegister = document.querySelector("#register-button")
const homeButton = document.querySelector("#home-button")
const secondRegisterButton = document.querySelector("#register-button__two")
const openMenu = document.querySelector(".options-button")
const menu = document.querySelector(".section-header")
const buttonHome = document.querySelector(".button_home")
const buttonMediaRegister = document.querySelector(".button_register")

buttonRegister.addEventListener("click", () => {
  window.location.replace('/pages/register.html')
})

homeButton.addEventListener("click", () => {
  window.location.replace('/index.html')
})

secondRegisterButton.addEventListener("click", () => {
  window.location.replace('/pages/register.html')
})

openMenu.addEventListener("click", () => {
menu.classList.toggle("show-Menu")
})

buttonHome.addEventListener("click", () => {
  window.location.replace('/index.html')
})

buttonMediaRegister.addEventListener("click", () => {
  window.location.replace('/pages/register.html')
})