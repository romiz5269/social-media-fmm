import { AxiosError } from "axios";
import { URL } from "config/Urls/Urls.config";
import { http } from "services/Http/axios";
import { axiosPrivate } from "services/Private/axiosPrivate";

export async function getAllBlogs() {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(URL.ALLBLOGS)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.status));
  });
}
export async function getAllBlogsByAuthor(username) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${URL.ALLUSERBLOGS}/${username}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.status));
  });
}
export async function getSingleBlogById(id) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${URL.SINGLEBLOG}/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.status));
  });
}
export async function createNewBlog(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    axiosPrivate
      .post(URL.CREATEBLOG, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => resolve(res.status))
      .catch((err) => reject(err.response?.status));
  });
}

export async function addNewLike(id) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .post(
        URL.CREATELIKE,
        {
          post: id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => resolve(res.status))
      .catch((err) => reject(err.message));
  });
}

export async function deleteLike(postid) {
  return new Promise((resolve, reject) => {
    axiosPrivate.delete(`${URL.DELETELIKE}/${postid}/`);
  });
}

export async function addNewComment(data) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .post(`/activity/comment/create/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log("Successfully"))
      .catch((err) => reject(err.message));
  });
}

export async function deleteComment(id) {
  return new Promise((resolve, reject) => {
    axiosPrivate.delete(`${URL.DELETECOMMENT}/${id}/`);
  });
}

export async function updateSingleBlog({ id, data }) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .patch(`${URL.EDITBLOG}/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.status));
  });
}
export async function deleteSingleBlog(id) {
  return new Promise((resolve, reject) => {
    axiosPrivate.delete(`${URL.DELETEBLOG}/${id}/`);
  });
}
