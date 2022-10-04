import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AddBlogForm } from "components";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { BiPaperPlane, BiPlus } from "react-icons/bi";

const style = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  overflowY: "auto",
};
function AddBlog() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 font-Vazirmatn hidden lg:block md:hidden mt-2 py-3 px-14 text-sm font-semibold text-white rounded-full shadow-xl "
      >
        بلاگ جدید
      </button>
      <button
        onClick={handleOpen}
        className="md:block lg:hidden fixed bg-gradient-to-r from-cyan-500 to-blue-500 sm:mt-4 mt-2 sm:py-3 sm:px-3 py-5 px-5 text-sm font-semibold text-white rounded-full shadow-xl "
      >
        <BiPaperPlane className="text-lg" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className=" top-[45%] h-[600px] sm:h-[650px] sm:top-[50%] w-[100%] sm:w-[80%] md:w-[50%] lg:w-[30%] lg:rounded-md"
        >
          <div className="flex flex-col mx-auto justify-center items-center">
            <AddBlogForm />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AddBlog;
