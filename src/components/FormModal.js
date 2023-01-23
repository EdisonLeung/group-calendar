import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function FormModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <div class="grid grid-cols-4 gap-1 bg-white rounded-lg m-2">
          <div class="col-span-4 h-auto">
            <div class="flex justify-end">
              <button
                class="h-8 w-8 rounded-full mr-2 hover:bg-red-300"
                onClick={() => {
                  props.onClose();
                }}
              >
                <i class="fa fa-trash"></i>
              </button>
              <button
                type="button"
                class="h-8 w-8 bg-gray-100 rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={props.onClose}
              >
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="col-span-4 font-sans">
            <p class="font-meduim text-xl"></p>
            <p class="font-light text-sm"></p>
            <p class="font-light text-sm"></p>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  boxShadow: 24,
  bgcolor: "#FFF",
  borderRadius: 3,
  m: 1,
};
export default FormModal;
