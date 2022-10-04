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

  SINGLEBLOG: "/polls",
  ALLBLOGS: "/polls",
  ALLUSERBLOGS: "/polls/postuser",
  ALLEXPLOREPOSTS: "/polls",
  ALLBLOGSBYFOLLOW: "/polls",
  CREATEBLOG: "/polls/",
  EDITBLOG: "/polls",
  DELETEBLOG: "/polls",

  CREATENEWLIKE: "/polls",
  DELETELIKE: "/polls",

  CREATECOMENT: "/polls",
  DELETECOMMENT: "/polls",

  ALLCOMMENTS: "/polls/",
  CREATEFOLLOW: "/account/follow",
  DELETEFOLLOW: "/account/unfollow",
};
