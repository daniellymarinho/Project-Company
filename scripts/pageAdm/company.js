import { getAllCompanies } from "../requests.js";
import { selectCompany } from "./constants.js";

let selectedCompany = null;

export async function renderSelectCompany() {
  selectCompany.innerHTML = "";

  const notSelected = document.createElement("option");
  notSelected.innerText = "Selecionar Empresa";
  notSelected.value = null;
  notSelected.selected = true;
  selectCompany.appendChild(notSelected);

  const companies = await getAllCompanies();
  selectCompany.append(
    ...companies.map(({ name, uuid }) => {
      const option = document.createElement("option");
      option.innerText = name;
      option.value = uuid;
      return option;
    })
  );
  selectCompany.addEventListener("change", () => {
    selectedCompany =
      selectCompany.value !== "null" ? selectCompany.value : null;
  });
}

export function getSelectedCompany() {
  return selectedCompany;
}
