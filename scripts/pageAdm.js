import { renderDepartmentsContent } from "./pageAdm/index.js";
import {
  getAllUsers,
  verifyUser,
  createDepartments,
  getAllCompanies,
  deleteUser,
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
const modalDeleteDepartment = document.querySelector(
  ".modal-delete__department"
);
const listUsers = document.querySelector(".registered-users");
const modalViewDepartment = document.querySelector(".modal-view__department");
const departmentName = document.querySelector(".department-name ");
const descriptionDepartment = document.querySelector(".description-deartment");
const companyNameModal = document.querySelector(".company-name");
const hireButton = document.querySelector(".hire-button");
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

function renderRegisteredUsers(array) {
  listUsers.innerHTML = "";
  array.forEach(createRegisteredUsers);
}

buttonDeleting.addEventListener("click", async () => {
  await deleteUser(deleteUserHiddenId.value);
  deleteUserHiddenId.value = "";
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
  const tost = document.createElement("span");

  userName.innerText = username;
  professionalLevel.innerText = professional_level;
  tost.innerText = `Realmente deseja remover o usuário ${username} ?`;
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

    closeModalUser();
  });

  buttonDeleteUser.addEventListener("click", () => {
    modalDeleteUser.showModal();
    deleteUserHiddenId.value = uuid;

    closeDeleteUser();
  });

  modalDeleteUser.append(tost);
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

function closeModalUser() {
  const buttonClose = document.querySelector(".button-close__user");

  buttonClose.addEventListener("click", () => {
    modalChangeUser.close();
  });
}

function closeDeleteUser() {
  const closeDelete = document.querySelector(".close-delete");

  closeDelete.addEventListener("click", async () => {
    const response = await getAllUsers();
    renderRegisteredUsers(response);
    deleteUserHiddenId.value = "";
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
  buttonCloseDelete.addEventListener
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

function createOptionCompany({ name, uuid }) {
  const selectCompany = document.querySelector("#select-companies-department");

  const options = document.createElement("option");

  options.value = uuid;
  options.innerText = name;

  selectCompany.append(options);
}

getAllCompanies().then(renderListCompany);
