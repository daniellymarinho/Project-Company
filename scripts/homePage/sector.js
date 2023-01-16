import { getAllSectores } from "../requests.js";
import { selectSector } from "./constants.js";
let selectedSector = null;

export async function renderSelectSector() {
  selectSector.innerHTML = "";

  const notSector = document.createElement("option");

  notSector.innerText = "Selecionar Setor";
  notSector.value = null;
  notSector.selected = true;

  selectSector.appendChild(notSector);

  const sector = await getAllSectores();
  selectSector.append(
    ...sector.map(({ uuid, description }) => {
      const option = document.createElement("option");
      option.innerText = description;
      option.value = uuid;
      return option;
    })
  );
  selectSector.addEventListener("change", () => {
    selectedSector = selectSector.value !== "null" ? selectSector.value : null;
  });
}

export function getSelectedSector() {
  return selectedSector;
}
