import {
  modalDeleteDepartment,
  modalChangeDepartment,
  deleteDepartmentHiddenInput,
  modalViewDepartment,
  departmentName,
  descriptionDepartment,
  companyNameModal,
  listDepartment,
  hireButton,
  hireUserHiddenInput,
  buttonCloseDelete,
  buttonConfirmDeleteDepartment,
  modalCreateDepartment,
  selectCompany,
  buttonCloseEditDepartment
} from "./constants.js";
import {
  dismissEmployee,
  editDepartment,
  deleteDepartment,
  userOfDepartment,
  getAllCompanyDepartment,
  hireDepartment,
  createDepartments,
  getAllDepartments,
} from "../requests.js";
import { getSelectedCompany } from "./company.js";

buttonCloseDelete.addEventListener("click", () => {
  deleteDepartmentHiddenInput.value = "";
  modalDeleteDepartment.close();
});

buttonConfirmDeleteDepartment.addEventListener("click", async () => {
  await deleteDepartment(deleteDepartmentHiddenInput.value);
  const result = await getAllDepartments();
  renderDepartments(result);
  modalDeleteDepartment.close();
  deleteDepartmentHiddenInput.value = "";
});

function createDepartment({ name, description, companies, uuid }) {
  const itemDepartment = document.createElement("li");
  const nameDepartment = document.createElement("span");
  const departmentDescription = document.createElement("span");
  const companyName = document.createElement("span");
  const buttonsDepartment = document.createElement("div");
  const showDetailsModalButton = document.createElement("button");
  const changeButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const viewDepartment = document.createElement("img");
  const changeDepartment = document.createElement("img");
  const deleteDepartmentImg = document.createElement("img");
  const textDeleteDepartment = document.createElement("span");

  nameDepartment.innerText = name;
  departmentDescription.innerText = description;
  companyName.innerText = companies.name;
  viewDepartment.src = "../assets/img/Vector (2).png";
  changeDepartment.src = "../assets/img/change.png";
  deleteDepartmentImg.src = "../assets/img/lixo.png";
  textDeleteDepartment.innerText = `Realmente deseja deletar ${name} e demitir seus funcionários?`;

  itemDepartment.classList.add("item-department");
  nameDepartment.classList.add("name-department");
  departmentDescription.classList.add("department-description");
  companyName.classList.add("company-name");
  showDetailsModalButton.classList.add("view-button");
  changeButton.classList.add("change-button");
  deleteButton.classList.add("delete-button");
  buttonsDepartment.classList.add("buttons-department");

  changeButton.addEventListener("click", () => {
    modalChangeDepartment.showModal();

    buttonCloseEditDepartment.addEventListener("click", () => {
      modalChangeDepartment.close()
    })
    
  });
  deleteButton.addEventListener("click", () => {
    deleteDepartmentHiddenInput.value = uuid;
    modalDeleteDepartment.appendChild(textDeleteDepartment);
    modalDeleteDepartment.showModal();
    buttonCloseDelete.addEventListener("click", () => {
      modalDeleteDepartment.close();
    });
  });

  showDetailsModalButton.addEventListener("click", async (event) => {
    modalViewDepartment.showModal();

    await getAllCompanyDepartment(companies.uuid);
    departmentName.innerText = name;
    descriptionDepartment.innerText = description;
    companyNameModal.innerText = companies.name;
    hireUserHiddenInput.value = uuid;
    const response = await userOfDepartment();
    renderUserOfDepartment(response);

    const closeViewDepartment = document.querySelector(
      ".close-view__department"
    );

    closeViewDepartment.addEventListener("click", () =>
      modalViewDepartment.close()
    );
  });

  showDetailsModalButton.appendChild(viewDepartment);
  changeButton.appendChild(changeDepartment);
  deleteButton.appendChild(deleteDepartmentImg);
  buttonsDepartment.append(showDetailsModalButton, changeButton, deleteButton);
  itemDepartment.append(
    nameDepartment,
    departmentDescription,
    companyName,
    buttonsDepartment
  );
  listDepartment.appendChild(itemDepartment);
}

function renderUserOfDepartment(array) {
  const listUsersOf = document.querySelector(".list-user__department");

  listUsersOf.innerHTML = "";

  array.forEach((userOf) => {
    listUsersOf.append(createUserOfDepartment(userOf));
  });
}

function createUserOfDepartment({
  username,
  professional_level,
  uuid,
  department_uuid,
}) {
  const userItem = document.createElement("li");
  const userName = document.createElement("span");
  const professionalLevel = document.createElement("span");
  const buttonOfUser = document.createElement("button");

  userName.innerText = username;
  professionalLevel.innerText = professional_level;
  buttonOfUser.innerText = "Desligar";

  userItem.classList.add("user-item");
  buttonOfUser.classList.add("button-of");
  userName.classList.add("user-name__department");
  professionalLevel.classList.add("professional-level__department");

  buttonOfUser.addEventListener("click", async () => {
    await dismissEmployee(uuid);
  });

  hireButton.addEventListener("click", async () => {
    const hire = {
      user_uuid: hireUserHiddenInput.value,
      department_uuid,
    };
    await hireDepartment(hire);
  });

  userItem.append(userName, professionalLevel, buttonOfUser);

  return userItem;
}

selectCompany.addEventListener("change", async () => {
  const departments = await getAllDepartments();
  renderDepartments(departments);
});

export function renderDepartments(array) {
  listDepartment.innerHTML = "";

  array
    .filter((department) => {
      const val = getSelectedCompany();
      return val === null || department.companies.uuid === val;
    })
    .forEach(createDepartment);
}

export function initializeCreateDepartmentForm() {
  const createNewDepartment = document.querySelector(
    ".button-create__department"
  );

  const inputs = document.querySelectorAll(".entry");
  createNewDepartment.addEventListener("click", async () => {
    const newDepartment = {};

    inputs.forEach((input) => {
      newDepartment[input.name] = input.value;
    });
    await createDepartments(newDepartment);
    const departments = await getAllDepartments();
    renderDepartments(departments);
    modalCreateDepartment.close();
  });
}
