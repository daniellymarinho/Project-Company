import { renderCompanies } from "./homePage.js";
import { getAllCompanies } from "../requests.js";
import { renderSelectSector } from "./sector.js";

(async () => {
  renderSelectSector();
  await renderCompanies();
})();
