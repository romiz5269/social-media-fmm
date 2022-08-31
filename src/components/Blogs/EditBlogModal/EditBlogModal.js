import React, { useEffect } from "react";
import { useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { AddBlogForm } from "components";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlogById } from "store/Reducers/Blogs/Blogs.Reducer";
import { EditBlogForm } from "components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  padding: "8px",
  overflowY: "scroll",
  height: "400px",
};
function EditBlogModal({ postid }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(fetchSingleBlogById(postid));
  };
  const handleClose = () => setOpen(false);

  const singleBlog = useSelector((state) => state.blogs.singleBlog);
  console.log(singleBlog);
  return (
    <div>
      <button onClick={handleOpen} className="text-xs text-slate-500">
        <FaPencilAlt />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-5/6 sm:w-2/5">
          <div className="flex flex-col mx-auto justify-center items-center">
            {singleBlog.length > 0 && <EditBlogForm blog={singleBlog} />}
            {/* <AddProductForm /> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export { EditBlogModal };
