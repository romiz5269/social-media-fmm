import { PATH } from "config/Path/Path.config";
import { axiosPrivate } from "services/Private/axiosPrivate";
import { http } from "services/Http/axios";
import { URL } from "config/Urls/Urls.config";

// function for userLogin in login page

export async function userLogin(data) {

  return new Promise((resolve, reject) => {
    http
      .post(URL.LOGIN, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => resolve(res.data.token))
      .catch((err) => reject(err.response.status));
  });
  
}

export function userLogout() {
 return new Promise ((resolve,reject)=>{
   axiosPrivate
     .post(URL.LOGOUT)
     .then((res) => resolve(res))
     .catch((err) => console.log(err));
 })
}


//fetch third user profile (not owner profile) search with username

export async function getUserProfile(username) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${URL.GETPROFILE}/${username}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.status));
  });
}

//fetch owner profile search with userid from access token

export async function getOwnerProfile(username) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${URL.GETPROFILE}/${username}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.status));
  });
}

export async function updateSingleProfile(data){
  return new Promise((resolve,reject)=>{
    axiosPrivate.patch(`${URL.EDITPROFILE}/${data.username}`,data.body)
    .then(res=>resolve(res.data))
    .catch(err=>reject(err?.response?.message))
  })
}

export async function addNewFollow(userid) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .post(`${URL.CREATEFOLLOW}/${userid}/`)
      .then((res) => resolve(res.status));
  });
}

export async function deleteFollow(userid) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .post(`${URL.DELETEFOLLOW}/${userid}/`)
      .then((res) => resolve(res.status));
  });
}

// // fetch third single user data

// export async function getSingleUserData(username) {
//   return new Promise((resolve, reject) => {
//     http
//       .get(`${URL.USER}/${username}`)
//       .then((res) => resolve(res.data))
//       .catch((err) => reject(err.message));
//   });
// }
