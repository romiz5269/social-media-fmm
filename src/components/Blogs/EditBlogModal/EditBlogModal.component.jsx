import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "services/Private/axiosPrivate";
import { URL } from "config/Urls/Urls.config";
import { EditBlogForm } from "components";
import { FaPencilAlt } from "react-icons/fa";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";



const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  padding: "8px 20px",
  height: "600px",
};

function EditBlogModal({ postid }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [targetBlog, setTargetBlog] = useState(null);
  const handleOpen = () => {
   try{
    const response =  axiosPrivate
    .get(`${URL.SINGLEBLOG}/${postid}`)
    .then((res) => setTargetBlog(res.data));
   }catch(err){
    console.log(err.message)
   }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-sm text-slate-500">
        <FaPencilAlt />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-5/6 sm:w-[450px]">
          <div className="flex flex-col mx-auto justify-center items-center">
            {targetBlog && <EditBlogForm blog={targetBlog} />}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export { EditBlogModal };
