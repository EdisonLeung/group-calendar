import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import React from "react";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
function EventModal(props) {
  function noRecurrDateInfo() {
    const startDate = new Date(props.modalInfo._instance.range.start);
    const endDate = new Date(props.modalInfo._instance.range.end)
    return startDate.toDateString() + " - " + endDate.toDateString()
  }
  function recurrDateInfo() {
    const days = props.modalInfo._def.recurringDef.typeData.daysOfWeek
    const arr = [];
    days.map((day)=> arr.push(WEEK_DAYS[day]))
    return "Every " + arr.toString()
  }
  function getTimeInfo() {
    if (props.modalInfo._def.allDay) {
      return "All Day"
    }
    const start = new Date(props.modalInfo._instance.range.start);
    const end = new Date(props.modalInfo._instance.range.end);

    const adjusted_start = new Date(new Date(start).setHours(start.getHours() + 8));
    const adjusted_end = new Date(new Date(end).setHours(end.getHours() + 8));
    const options = { hour: 'numeric', minute: 'numeric', hour12: true }

    return adjusted_start.toLocaleTimeString('en-US', options) + " - " + adjusted_end.toLocaleTimeString('en-us', options)
  }
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={modalStyle}>
      {props.modalInfo !== undefined && (
        <div class="grid grid-cols-4 gap-1 bg-white rounded-lg m-2">
          <div class="col-span-4 h-auto">
            <div class="flex justify-end">
              <button
                class="h-8 w-8 rounded-full mr-2 hover:bg-red-300"
                onClick={() => {
                  props.deleteEvent(props.modalInfo);
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
            <p class="font-meduim text-xl">
              {props.modalInfo._def.title}
            </p>
            <p class="font-light text-sm">
              {getTimeInfo()}
            </p>
            <p class="font-light text-sm">
              {props.modalInfo._def.recurringDef === null ? noRecurrDateInfo() : recurrDateInfo()}
            </p>
            {/* {console.log(props.modalInfo)} */}
          </div>
        </div>)}
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
export default EventModal;
