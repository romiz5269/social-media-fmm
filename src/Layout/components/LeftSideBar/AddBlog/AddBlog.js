import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AddBlogForm } from "components";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
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
function AddBlog() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-orange-500 font-Vazirmatn hidden lg:block md:hidden mt-2 py-3 px-9 text-sm font-semibold text-white rounded-full shadow-xl "
      >
        بلاگ جدید
      </button>
      <button
        onClick={handleOpen}
        className="md:block lg:hidden fixed bg-orange-500 mt-2 py-3 px-3 text-sm font-semibold text-white rounded-full shadow-xl "
      >
        <FaPlus />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style} className="w-5/6 sm:w-2/5">
          <div className="flex flex-col mx-auto justify-center items-center">
            <AddBlogForm />
            {/* <AddProductForm /> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AddBlog;
