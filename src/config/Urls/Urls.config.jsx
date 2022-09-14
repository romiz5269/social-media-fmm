export const URL = {
  REQ_URL: "https://social-new2.herokuapp.com",
  USER: "/user",
  BLOGS: "/blogs",
  REGISTER: "/account/register/", //POST
  LOGIN: "/account/api/token/", //POST
  LOGOUT: "/account/logout/", //POST
  REFRESHTOKEN: "/account/token/refresh", //POST
  GETPROFILE: "/account/profile",
  EDITPROFILE: "/account/profile", //PATCH

  CHANGEPASSWORD: "/account/changepassword", //PATCH

  SINGLEBLOG: "/polls/post",
  ALLBLOGS: "/polls",
  ALLUSERBLOGS: "/polls/postuser",
  CREATEBLOG: "/polls/postcreate/",
  EDITBLOG: "/polls/post",
  DELETEBLOG: "/polls/post",

  CREATECOMENT: "/polls/createcomment",

  CREATEFOLLOW: "/account/follow",
  DELETEFOLLOW: "/account/unfollow",
};
