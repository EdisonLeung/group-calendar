import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { API } from "aws-amplify";
import React, { useState } from "react";
import { listCalendarGroups } from "../graphql/queries";

import {
  updateCalendarGroup as updateGroupMutation,
} from "../graphql/mutations";

function JoinCalendarModal(props) {
  const [joinCode, setJoinCode] = useState()
  async function joinCalendarGroup() {
    
    const apiData = await API.graphql({ query: listCalendarGroups });
    const eventsFromAPI = apiData.data.listCalendarGroups.items.filter((item) =>
      item.id.split("-")[0] === joinCode
    );
    if (eventsFromAPI.length === 1) {
      const data = {
        id: eventsFromAPI[0].id,
        users: [...eventsFromAPI[0].users, props.userInfo.username]
      }
      await API.graphql({
        query: updateGroupMutation,
        variables: { input: data}});
    }
    console.log(eventsFromAPI)
    // setGroups(eventsFromAPI);
  }
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
            <form>
              <div class="mb-4">
                <input
                  type="text"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Group Code (ex: ####)"
                  required
                  onChange={(e)=>setJoinCode(e.target.value)}
                />
              </div>
              <button
                type="submit"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-2"
                onClick={joinCalendarGroup}
              >
                Join
              </button>
              <button
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={props.onClose}
              >
                Cancel
              </button>
            </form>
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
};
export default JoinCalendarModal;
