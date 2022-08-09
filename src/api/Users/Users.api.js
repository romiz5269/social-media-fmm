import { http } from "services/Http/axios";

export async function getUserData() {
  return new Promise((resolve, reject) => {
    http
      .get(URL.USER)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.message));
  });
}

export async function getSingleUserData(id) {
  return new Promise((resolve, reject) => {
    http
      .get(`${URL.USER}?id=${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.message));
  });
}
export async function addSingleUser(data) {
  return new Promise((resolve, reject) => {
    http
      .post(URL.USER, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.message));
  });
}
export async function updateSingleUser({ id, data }) {
  return new Promise((resolve, reject) => {
    http
      .patch(`${URL.USER}?id=${id}`, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.message));
  });
}
