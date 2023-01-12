import { getAllCompanies, getCompaniesSectores } from './requests.js'

function renderAllCompanies(array){
  array.forEach(company => {
    const companies = createListCompanies(company)
    
  });
}


function createListCompanies({name, opening_hours, sectors}) {
  const listCompanies = document.querySelector(".list-companies")
 

  const itemList = document.createElement("li")
  const companyName = document.createElement("span")
  const divDescription = document.createElement("div")
  const openingHours = document.createElement("span")
  const sector = document.createElement("span")

  companyName.innerText = name
  openingHours.innerText = `${opening_hours} horas`
  sector.innerText = sectors.description

  itemList.classList.add("item-list")
  companyName.classList.add("name-company")
  openingHours.classList.add("opening-hours")
  sector.classList.add("sector")
  divDescription.classList.add("description-item")


  itemList.append(companyName, divDescription)
  divDescription.append(openingHours, sector)
  listCompanies.appendChild(itemList)
  
}
getAllCompanies().then(renderAllCompanies)

const inputLogin = document.querySelector(".input-login")
const inputRegister = document.querySelector(".input-register")

inputLogin.addEventListener("click", ()=>{
  window.location.replace('/pages/login.html')
  })
  
  inputRegister.addEventListener("click", () => {
    window.location.replace('/pages/register.html')
})

