import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EditSingleBlog } from "store/Reducers/Blogs/Blogs.Reducer";

function EditBlogForm({ blog }) {
  console.log(blog)
  const [content, setContent] = useState(blog?.content);
  const [title, setTitle] = useState(blog?.title);
  const dispatch=useDispatch()
  const hanldeUpdateBlog = (e, id) => {
    e.preventDefault();
    dispatch(EditSingleBlog({
        id:id,
        content:content,
        title:title,
    }))
  };

  return (
    <>
      {blog ? (
          <div>
            <form onSubmit={(e) => hanldeUpdateBlog(e, blog.id)}>
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
      ):(
        'failed to load data'
      )
      }
    </>
  );
}

export { EditBlogForm };
