import { getEmployeeInfo, verifyUser, listDepartmentEmployee } from "./requests.js"


verifyUser().then(({ is_admin }) => {
  if (is_admin) {
    window.location.replace('/pages/pageAdm.html')
  }
})

function createPageEmployee({ username, email, professional_level, kind_of_work }) {
  const sectionHeader = document.querySelector(".section-header")
  const modalChange = document.querySelector(".modal-changeInfo")
  const closeModal = document.querySelector(".close-modal")

  const userName = document.createElement("span")
  const userEmail = document.createElement("span")
  const divData = document.createElement("div")
  const divsection = document.createElement("div")
  const divsectionTwo = document.createElement("div")
  const userProfessionalLevel = document.createElement("span")
  const modo = document.createElement("span")
  const changeProfile = document.createElement("button")
  const changeProfileImg = document.createElement("img")

  userName.innerText = username
  userEmail.innerText = `Email: ${email}`
  userProfessionalLevel.innerText = professional_level
  modo.innerText = kind_of_work
  changeProfileImg.src = "../assets/img/change.png"

  userName.classList.add("user-name")
  userEmail.classList.add("user-email")
  userProfessionalLevel.classList.add("professional-level")
  modo.classList.add("modo")
  divsectionTwo.classList.add("section-two")
  changeProfile.classList.add("button-changeProfile")
  divData.classList.add("div-data")
  changeProfileImg.classList.add("change-img")

  changeProfile.addEventListener("click", () => {
    modalChange.showModal()

    closeModalButton()
  })

  divsection.appendChild(userName)
  divsectionTwo.append(userEmail, userProfessionalLevel, modo)
  divData.append(divsection, divsectionTwo)
  changeProfile.appendChild(changeProfileImg)
  sectionHeader.append(divData, changeProfile)

}
getEmployeeInfo().then(createPageEmployee)


function logout() {
  const buttonLogout = document.querySelector(".button-logout")

  buttonLogout.addEventListener("click", () => {
    localStorage.clear()
    window.location.replace('/pages/login.html')
  })
}

function closeModalButton() {
  const modalChange = document.querySelector(".modal-changeInfo")
  const closeModal = document.querySelector(".close-modal")

  closeModal.addEventListener("click", () => {
    modalChange.close()
  })

}

logout()

const mainPage = document.querySelector(".page-hires")

function createDepartment({name, departments,}){
  const companyName = document.createElement("span")
  const departmentName = document.createElement("span")


  companyName.innerText = name
  departmentName.innerText = departments.name

  mainPage.append(companyName, departmentName)

}

listDepartmentEmployee().then(createDepartment)