import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Button from "./Button";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function CustomModal({ open, setOpen }: IProps) {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px] bg-white rounded-md p-4 flex flex-col justify-center items-center">
        <div
          onClick={handleClose}
          className="cursor-pointer bg-red-200 rounded-full p-1 ml-auto mb-3"
        >
          <CloseOutlinedIcon sx={{ color: "red" }} />
        </div>
        <span className="text-black font-semibold mb-10">
          Are you sure you want to delete the attendance?
        </span>
        <Button onClick={handleClose} style={{ width: "150px" }}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
