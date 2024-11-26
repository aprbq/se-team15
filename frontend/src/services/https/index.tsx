import { EmployeeInterface, CustomerInterface, GendersInterface, PositionsInterface, WarehousesInterface } from "../../interfaces/InterfaceFull";
import { SignInInterface } from "../../interfaces/SignIn";
import axios from "axios";

//EmployeeInterface, CustomerInterface, GendersInterface, PositionsInterface, WarehousesInterface

const apiUrl = "http://localhost:8080";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },

};


async function SignIn(data: SignInInterface) {

  return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function GetGender() {

  return await axios

    .get(`${apiUrl}/genders`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function GetAllEmployees() {

  return await axios

    .get(`${apiUrl}/users`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function GetEmployeesById(id: string) {

  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function UpdateEmployeeById(id: string, data: EmployeeInterface) {

  return await axios

    .put(`${apiUrl}/user/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function DeleteEmployeeById(id: string) {

  return await axios

    .delete(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function CreateEmployee(data: EmployeeInterface) {

  return await axios

    .post(`${apiUrl}/signup`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}

//----------------------warehouse-----------------------//
async function GetProvince() {
  return await axios
    .get(`${apiUrl}/provinces`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehouseTypes() {
  return await axios
    .get(`${apiUrl}/warehouseTypes`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehouseStatuses() {
  return await axios
    .get(`${apiUrl}/warehouseStatuses`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehouses() {
  return await axios
    .get(`${apiUrl}/warehouses`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetWarehousesById(id: string) {
  return await axios
    .get(`${apiUrl}/warehouse/${id}`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateWarehousesById(id: string, data: WarehousesInterface) {
  return await axios
    .put(`${apiUrl}/warehouse/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteWarehousesById(id: string) {
  return await axios
    .delete(`${apiUrl}/warehouse/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateWarehouse(data: WarehousesInterface) {
  return await axios
    .post(`${apiUrl}/warehouses`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {

  SignIn,
  GetGender,
  GetAllEmployees,
  GetEmployeesById,
  UpdateEmployeeById,
  DeleteEmployeeById,
  CreateEmployee,
  GetProvince,
  GetWarehouseTypes,
  GetWarehouseStatuses,
  GetWarehouses,
  GetWarehousesById,
  UpdateWarehousesById,
  DeleteWarehousesById,
  CreateWarehouse,

};
