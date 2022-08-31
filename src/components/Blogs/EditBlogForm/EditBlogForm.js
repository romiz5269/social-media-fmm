import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EditSingleBlog } from "store/Reducers/Blogs/Blogs.Reducer";

function EditBlogForm({ blog }) {
  const [content, setContent] = useState(blog[0]?.content);
  const [title, setTitle] = useState(blog[0]?.title);
  const dispatch=useDispatch()
    console.log(blog)
  const hanldeUpdateBlog = (e, id) => {
    e.preventDefault();
    dispatch(EditSingleBlog({
        id:id,
        content:content,
        title:title,
    }))
  };

  return (
    <div>
      <form onSubmit={(e) => hanldeUpdateBlog(e, blog[0].id)}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2"
        />

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-2"
        />
        <button>Save Changes</button>
      </form>
    </div>
  );
}

export { EditBlogForm };
