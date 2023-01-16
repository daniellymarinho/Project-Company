import { getAllCompanies } from "../requests.js";
import { getSelectedSector } from "./sector.js";
import { selectSector, openMenu, menu } from "./constants.js";

export function renderAllCompanies(array) {
  listCompanies.innerText = "";

  array
    .filter((company) => {
      const sector = getSelectedSector();
      return sector === null || company.sectors.uuid === sector;
    })
    .forEach(createListCompanies);
}

const listCompanies = document.querySelector(".list-companies");

function createListCompanies({ name, opening_hours, sectors }) {
  const itemList = document.createElement("li");
  const companyName = document.createElement("span");
  const divDescription = document.createElement("div");
  const openingHours = document.createElement("span");
  const sector = document.createElement("span");

  companyName.innerText = name;
  openingHours.innerText = `${opening_hours} horas`;
  sector.innerText = sectors.description;

  itemList.classList.add("item-list");
  companyName.classList.add("name-company");
  openingHours.classList.add("opening-hours");
  sector.classList.add("sector");
  divDescription.classList.add("description-item");

  itemList.append(companyName, divDescription);
  divDescription.append(openingHours, sector);
  listCompanies.appendChild(itemList);
}

const inputLogin = document.querySelector(".input-login");
const inputRegister = document.querySelector(".input-register");
const mediaButtonLogin = document.querySelector(".media-button__login");
const mediaButtonRgister = document.querySelector(".media-button__register");

inputLogin.addEventListener("click", () => {
  window.location.replace("/pages/login.html");
});

inputRegister.addEventListener("click", () => {
  window.location.replace("/pages/register.html");
});

export async function renderCompanies() {
  const sector = await getAllCompanies();
  renderAllCompanies(sector);
}
selectSector.addEventListener("change", renderCompanies);

openMenu.addEventListener("click", () => {
  menu.classList.toggle("show-button__menu");
});

mediaButtonLogin.addEventListener("click", () => {
  window.location.replace("/pages/login.html");
})

mediaButtonRgister.addEventListener("click", () => {
  window.location.replace("/pages/register.html");
})