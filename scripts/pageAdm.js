import { deleteUserText } from "./pageAdm/constants.js";
import { renderDepartmentsContent } from "./pageAdm/index.js";
import {
  getAllUsers,
  verifyUser,
  createDepartments,
  getAllCompanies,
  deleteUser,
  changeInfoEmployee,
} from "./requests.js";

verifyUser().then(({ is_admin }) => {
  if (!is_admin) {
    window.location.replace("/pages/pageFun.html");
  }
});

renderDepartmentsContent();
const modalChangeDepartment = document.querySelector(".change-department");
const modalChangeUser = document.querySelector(".modal-change__user");
const modalDeleteUser = document.querySelector(".modal-delete__user");
const modalcreate = document.querySelector(".create-department");
const buttonCreate = document.querySelector(".create-button");
const listUsers = document.querySelector(".registered-users");
const modalViewDepartment = document.querySelector(".modal-view__department");
const buttonConfirmDeleteDepartment =
  document.querySelector(".delete-department");
const buttonDeleting = document.querySelector(".button-delete-user");
const listDepartment = document.querySelector(".list-department");
const deleteDepartmentHiddenInput = document.querySelector(
  ".hidden-delete__department"
);
const buttonCloseDelete = document.querySelector(".close-delete__department");
const createDepartmentHiddenInput = document.querySelector(
  ".hidden-create__department"
);
const deleteUserHiddenId = document.querySelector(".hidden-delete__user");
const editUserHidden = document.querySelector(".hidden-edit__user");
const optionsEditUser = document.querySelectorAll(
  ".modal-change__user select.field"
);
const buttonEditUser = document.querySelector(".button-edit__user");

const closeDelete = document.querySelector(".close-delete");
function renderRegisteredUsers(array) {
  listUsers.innerHTML = "";
  
    array.forEach(createRegisteredUsers);
  }


buttonDeleting.addEventListener("click", async () => {
  await deleteUser(deleteUserHiddenId.value);
  const response = await getAllUsers();
  renderRegisteredUsers(response);
  deleteUserHiddenId.value = "";
  modalDeleteUser.close();
});

function createRegisteredUsers({ username, professional_level, uuid }) {
  const itemUser = document.createElement("li");
  const userName = document.createElement("span");
  const professionalLevel = document.createElement("span");
  const companyName = document.createElement("span");
  const divButtons = document.createElement("div");
  const buttonChangeUser = document.createElement("button");
  const buttonDeleteUser = document.createElement("button");
  const changeUser = document.createElement("img");
  const deleteUserimg = document.createElement("img");
  const toast = document.createElement("span");

  userName.innerText = username;
  professionalLevel.innerText = professional_level;
  toast.innerText = `Realmente deseja remover o usuário ${username} ?`;
  changeUser.src = "../assets/img/change.png";
  deleteUserimg.src = "../assets/img/lixo.png";

  itemUser.classList.add("item-user");
  userName.classList.add("user-name");
  professionalLevel.classList.add("user-professional");
  buttonChangeUser.classList.add("button-change");
  buttonDeleteUser.classList.add("button-delete");
  divButtons.classList.add("buttons");

  buttonChangeUser.addEventListener("click", () => {
    modalChangeUser.showModal();
    editUserHidden.value = uuid;
  });

  closeModalEditUser();

  buttonDeleteUser.addEventListener("click", async () => {
    modalDeleteUser.showModal();
    deleteUserHiddenId.value = uuid;

    deleteUserText.appendChild(toast);

    closeDeleteUser();
  });

  divButtons.append(buttonChangeUser, buttonDeleteUser);
  buttonChangeUser.append(changeUser);
  buttonDeleteUser.append(deleteUserimg);
  itemUser.append(userName, professionalLevel, divButtons);
  listUsers.append(itemUser);
}
getAllUsers().then(renderRegisteredUsers);

buttonCreate.addEventListener("click", () => {
  modalcreate.showModal();

  closeModalCreate();
});

function logout() {
  const buttonLogout = document.querySelector(".logout-button");

  buttonLogout.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("/pages/login.html");
  });
}
logout();

function closeModalEditUser() {
  const buttonClose = document.querySelector(".button-close__user");

  buttonClose.addEventListener("click", async () => {
    modalChangeUser.close();
  });
}

function closeDeleteUser() {
  closeDelete.addEventListener("click", async () => {
    deleteUserHiddenId.value = "";
    deleteUserText.innerHTML = "";

    modalDeleteUser.close();
  });
}

function closeModalCreate() {
  const buttonCloseModalCreate = document.querySelector(".close-modal__create");

  buttonCloseModalCreate.addEventListener("click", () => {
    modalcreate.close();
  });
}

function closeModalChangeDepartment() {
  const buttonCloseModalEdit = document.querySelector(
    ".close-button-editModal"
  );

  buttonCloseModalEdit.addEventListener("click", () =>
    modalChangeDepartment.close()
  );
}

function closeDeleteDepartment() {
  buttonCloseDelete.addEventListener;
}

function closeModalViewDepartment() {
  const closeViewDepartment = document.querySelector(".close-view__department");

  closeViewDepartment.addEventListener("click", () =>
    modalViewDepartment.close()
  );
}

function renderListCompany(array) {
  array.forEach(createOptionCompany);
}

/* Criação de opções para criação de departamento*/
function createOptionCompany({ name, uuid }) {
  const selectCompany = document.querySelector("#select-companies-department");

  const options = document.createElement("option");

  options.value = uuid;
  options.innerText = name;

  selectCompany.append(options);
}

getAllCompanies().then(renderListCompany);

function renderListEditeCompany(array) {
  array.forEach(createOptionEditDepartment);
}

function createOptionEditDepartment({ name, uuid }) {
  const selectEditDepartment = document.querySelector(
    "#select-companies-edit__department"
  );

  const options = document.createElement("option");

  options.value = uuid;
  options.innerText = name;

  selectEditDepartment.append(options);
}

getAllCompanies().then(renderListEditeCompany);

buttonEditUser.addEventListener("click", async () => {
  const newInfo = {};

  optionsEditUser.forEach((input) => {
    if (input.value) newInfo[input.name] = input.value;
  });
  await changeInfoEmployee(newInfo, editUserHidden.value);
  const users = await getAllUsers();
  listUsers.innerHTML = "";
  users.forEach(createRegisteredUsers);
  modalChangeUser.close();
});
