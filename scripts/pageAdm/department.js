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
  buttonCloseEditDepartment,
  divTextDelete,
  selectUser,
  editDepartmentHiddenInput,
} from "./constants.js";
import {
  dismissEmployee,
  editDepartment,
  deleteDepartment,
  userWithoutDepartment,
  getAllCompanyDepartment,
  hireDepartment,
  createDepartments,
  getAllDepartments,
  getEmoloyeesByDepartment,
  getAllUsers,
} from "../requests.js";
import { getSelectedCompany } from "./company.js";

buttonCloseDelete.addEventListener("click", () => {
  deleteDepartmentHiddenInput.value = "";
  modalDeleteDepartment.close();
  divTextDelete.innerHTML = "";
});

buttonConfirmDeleteDepartment.addEventListener("click", async () => {
  await deleteDepartment(deleteDepartmentHiddenInput.value);
  const result = await getAllDepartments();
  renderDepartments(result);
  deleteDepartmentHiddenInput.value = "";

  modalDeleteDepartment.close();
});
const closeViewDepartment = document.querySelector(".close-view__department");

closeViewDepartment.addEventListener("click", () =>
  modalViewDepartment.close()
);

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
  textDeleteDepartment.classList.add("text-modal__delete");

  changeButton.addEventListener("click", () => {
    modalChangeDepartment.showModal();
    editDepartmentHiddenInput.value = uuid;
    buttonCloseEditDepartment.addEventListener("click", () => {
      modalChangeDepartment.close();
    });
  });
  deleteButton.addEventListener("click", () => {
    deleteDepartmentHiddenInput.value = uuid;
    divTextDelete.appendChild(textDeleteDepartment);
    modalDeleteDepartment.showModal();
  });

  showDetailsModalButton.addEventListener("click", async () => {
    modalViewDepartment.showModal();
    await renderDetailsModal({ companies, name, description, uuid });
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

async function renderDetailsModal({ companies, name, description, uuid }) {
  selectUser.innerHTML = "";

  await getAllCompanyDepartment(companies.uuid);
  departmentName.innerText = name;
  descriptionDepartment.innerText = description;
  companyNameModal.innerText = companies.name;
  hireUserHiddenInput.value = uuid;
  const response = await getAllUsers();

  renderUserOfDepartment(
    response.filter((user) => user.department_uuid === uuid)
  );
  const notSelected = document.createElement("option");
  notSelected.innerText = "Selecionar Usuário";
  notSelected.value = null;
  notSelected.selected = true;
  selectUser.appendChild(notSelected);
  selectUser.append(
    ...(await userWithoutDepartment()).map((user) => {
      const opt = document.createElement("option");
      opt.innerText = user.username;
      opt.value = user.uuid;
      return opt;
    })
  );
}

function renderUserOfDepartment(array) {
  const listUsersOf = document.querySelector(".list-user__department");

  listUsersOf.innerHTML = "";

  array.forEach((userOutOfWork) => {
    listUsersOf.append(createUserOfDepartment(userOutOfWork));
  });
}

hireButton.addEventListener("click", async () => {
  const hire = {
    user_uuid: selectUser.value,
    department_uuid: hireUserHiddenInput.value,
  };

  await hireDepartment(hire);
  const [department] = await getAllDepartments().then((response) =>
    response.filter(
      (department) => department.uuid === hireUserHiddenInput.value
    )
  );
  renderDetailsModal(department);
});
function createUserOfDepartment({ username, professional_level, uuid, department_uuid }) {
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
    const [department] = await getAllDepartments().then((response) =>
      response.filter(
        (department) => department.uuid === department_uuid
      )
    );
    renderDetailsModal(department);
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

const saveEdit = document.querySelector(".save-edit");
const dataInputs = document.querySelectorAll(".data");

saveEdit.addEventListener("click", async () => {
  const infoEdit = {};

  dataInputs.forEach((input) => {
    if (input.value) infoEdit[input.name] = input.value;
  });

  const [department] = (await getAllDepartments()).filter(
    (department) => department.uuid === editDepartmentHiddenInput.value
  );
  if (
    !infoEdit.company_uuid ||
    infoEdit.company_uuid === department.company__uuid
  ) {
    await editDepartment(infoEdit, editDepartmentHiddenInput.value);
  } else {
    const users = [];
    for (const user of await getAllUsers()) {
      if (user.department_uuid !== editDepartmentHiddenInput.value) continue;
      users.push(user);
    }
    const newInfo = { ...department, ...infoEdit };
    await deleteDepartment(editDepartmentHiddenInput.value);
    const newDepartment = await createDepartments(newInfo);
    for (const user of users)
      await hireDepartment({
        user_uuid: user.uuid,
        department_uuid: newDepartment.uuid,
      });
  }

  const edit = await getAllDepartments();
  renderDepartments(edit);
  modalChangeDepartment.close();
});
