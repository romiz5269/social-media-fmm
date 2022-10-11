import { AxiosError } from "axios";
import { URL } from "config/Urls/Urls.config";
import { http } from "services/Http/axios";
import { axiosPrivate } from "services/Private/axiosPrivate";

export async function getAllBlogs(config) {
  if (config.pageNum === undefined) {
    config.pageNum = 1;
  }
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${URL.ALLBLOGS}?route=blogs&page=${config.pageNum}`, {
        signal: config.options.signal,
      })
      .then((res) => resolve(res.data.results))
      .catch((err) => {
        if (config.options.signal.aborted) return;
        reject(err);
      });
  });
}
export async function getAllBlogsByAuthor(config) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${URL.ALLUSERBLOGS}/${config.username}?page=${config.pageNum}`, {
        signal: config.options.singnal,
      })
      .then((res) => resolve(res.data.results))
      .catch((err) => {
        if (config.options.signal.aborted) return;
        reject(err.response?.status);
      });
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
export async function getAllBlogsByFollow(config) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${URL.ALLBLOGSBYFOLLOW}?route=home&page=${config.pageNum}`, {
        signal: config.options.signal,
      })
      .then((res) => resolve(res.data.results))
      .catch((err) => {
        if (config.options.signal.aborted) return;
        reject(err.message);
      });
  });
}
export async function getAllExplorePosts(config) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${URL.ALLEXPLOREPOSTS}?route=explore&page=${config.pageNum}`, {
        signal: config.options.signal,
      })
      .then((res) => resolve(res.data.results))
      .catch((err) => {
        if (config.options.signal.aborted) return;
        reject(err.message);
      });
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
        `${URL.CREATENEWLIKE}/${id}/like/`,
        {},
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
    axiosPrivate.delete(`${URL.DELETELIKE}/${postid}/like/`);
  });
}

export async function getAllComments(config) {
  console.log(config);
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(
        `${URL.ALLCOMMENTS}${config.postId}/comment/?page=${config.pageNum}`,
        {
          signal: config.options.signal,
        }
      )
      .then((res) => resolve(res.data.results))
      .catch((err) => reject(err));
  });
}

export async function addNewComment(data) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .post(
        `${URL.CREATECOMENT}/${data.id}/comment/`,
        {
          body: data.body,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => console.log("Successfully"))
      .catch((err) => reject(err.message));
  });
}

export async function deleteComment(data) {
  return new Promise((resolve, reject) => {
    axiosPrivate.delete(
      `${URL.DELETECOMMENT}/${data.postId}/comment/${data.commentId}/`
    );
  });
}

export async function updateSingleBlog(data) {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .patch(
        `${URL.EDITBLOG}/${data.id}/`,
        {
          content: data.content,
          title: data.title,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response?.status));
  });
}
export async function deleteSingleBlog(id) {
  return new Promise((resolve, reject) => {
    axiosPrivate.delete(`${URL.DELETEBLOG}/${id}`);
  });
}
