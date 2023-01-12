import {
  initializeCreateDepartmentForm,
  renderDepartments,
} from "./department.js";
import { renderSelectCompany } from "./company.js";
import { getAllDepartments } from "../requests.js";
export const renderDepartmentsContent = async () => {
  renderSelectCompany();
  initializeCreateDepartmentForm();
  const departments = await getAllDepartments();
  renderDepartments(departments);
};
