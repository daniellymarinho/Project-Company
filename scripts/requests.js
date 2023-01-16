import { getUser } from "./user.js";

/* Criar Usuário*/
export async function createUser(data) {
  const register = await fetch("http://localhost:6278/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await register.json();
}

/* Login*/
export async function login(data) {
  const loginAPI = await fetch("http://localhost:6278/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await loginAPI.json();
}

/*  Listar todas as Empresas */
export async function getAllCompanies() {
  const companieAPI = await fetch("http://localhost:6278/companies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await companieAPI.json();
}

/*Listar Empresas por setor*/
export async function getCompaniesSectores(sector) {
  const companiesSectores = await fetch(
    `http://localhost:6278/companies${sector}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await companiesSectores.json();
}

/*Listar todos os setores*/
export async function getAllSectores() {
  const allsectores = await fetch("http://localhost:6278/sectors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await allsectores.json();
}

/*Buscas Informações do funcionario logado*/
export async function getEmployeeInfo() {
  const { token } = getUser();
  const employeeInfo = await fetch("http://localhost:6278/users/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await employeeInfo.json();
}

/*Listar todos os funcionários do mesmo departamento*/
export async function getEmoloyeesByDepartment() {
  const { token } = getUser();
  const employesBySector = await fetch(
    "http://localhost:6278/users/departments/coworkers",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await employesBySector.json();
}

/* Listar os Departamentos da empresa do funcionário logado*/
export async function listDepartmentEmployee() {
  const { token } = getUser();
  const listDepartment = await fetch(
    "http://localhost:6278/users/departments/coworkers",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await listDepartment.json();
}

/*Atualizar informações do funcionário*/
export async function updateInfoEmployees() {
  const { token } = getUser();
  const upDate = await fetch("http://localhost:6278/users", {
    method: "PATH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await upDate.json();
}

/* Cadastrar Empresa*/
export async function registerCompany(data) {
  const { token } = getUser();
  const registerCompany = await fetch("http://localhost:6278/companies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await registerCompany.json();
}

/*Listar todos os departamentos*/
export async function getAllDepartments() {
  const { token } = getUser();
  const departmentCompanies = await fetch(
    `http://localhost:6278/departments/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await departmentCompanies.json();
}

/*Listar todos os departamentos de uma empresa*/
export async function getAllCompanyDepartment(id) {
  const { token } = getUser();
  const companyDepartment = await fetch(
    `http://localhost:6278/departments/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await companyDepartment.json();
}

/*Criar departamento*/
export async function createDepartments(data) {
  const { token } = getUser();
  const newDep = await fetch("http://localhost:6278/departments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await newDep.json();
}

/*Contratar funcionário*/
export async function hireDepartment(data) {
  const { token } = getUser();
  const hire = await fetch("http://localhost:6278/departments/hire/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await hire.json();
}

/*Demitir funcionário*/
export async function dismissEmployee(id) {
  const { token } = getUser();
  const dismiss = await fetch(
    `http://localhost:6278/departments/dismiss/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await dismiss.json();
}

/*Editar Departamento*/
export async function editDepartment(data, id) {
  const { token } = getUser();
  const edit = await fetch(`http://localhost:6278/departments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await edit.json();
}

/*Deletar departamento*/
export async function deleteDepartment(id) {
  const { token } = getUser();
  await fetch(`http://localhost:6278/departments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/*listar todos os usuários*/
export async function getAllUsers() {
  const { token } = getUser();
  const allUsers = await fetch("http://localhost:6278/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await allUsers.json();
}

/*Usuários sem departamentos*/
export async function userWithoutDepartment() {
  const { token } = getUser();
  const userOf = await fetch("http://localhost:6278/admin/out_of_work", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await userOf.json();
}

/* Atualizar informações do funcionário */
export async function changeInfoEmployee(data,id ) {
  const { token } = getUser();
  const changeInfo = await fetch(
    `http://localhost:6278/admin/update_user/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return await changeInfo.json();
}

/*Deletar usuário*/
export async function deleteUser(id) {
  const { token } = getUser();
  await fetch(`http://localhost:6278/admin/delete_user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
 
}

/*Verificar o tipo de usuário*/
export async function verifyUser() {
  const { token } = getUser();
  const verify = await fetch("http://localhost:6278/auth/validate_user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await verify.json();
}
