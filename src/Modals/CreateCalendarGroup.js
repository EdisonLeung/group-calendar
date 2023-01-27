import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { listCalendarGroups } from "../graphql/queries";
import {
  createCalendarGroup as createCalendarGroupMutation,
  deleteCalendarGroup as deleteCalendarGroupMutation,
} from "../graphql/mutations";
import { Button, Flex, Text, View } from "@aws-amplify/ui-react";
function CreateCalendarGroup(props) {
  const [groupName, setGroupName] = useState();

  const [test_groups, setTestGroups] = useState([]);
  async function createGroup() {
    const data = {
      groupName: groupName,
      users: [props.userInfo.username],
    };
    await API.graphql({
      query: createCalendarGroupMutation,
      variables: { input: data },
    });
    fetchGroups();
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  async function deleteEvent({ id }) {
    await API.graphql({
      query: deleteCalendarGroupMutation,
      variables: { input: { id } },
    });
    fetchGroups();
  }
  async function fetchGroups() {
    const apiData = await API.graphql({ query: listCalendarGroups });
    const eventsFromAPI = apiData.data.listCalendarGroups.items;
    setTestGroups(eventsFromAPI);
  }
  return (
    <div>
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
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Group Name"
                  required
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="password (optional)"
                />
              </div>
              <button
                type="submit"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-2"
                onClick={() => createGroup()}
              >
                Create Group
              </button>
              <button
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={props.onClose}
              >
                Cancel
              </button>
              {/* <View margin="3rem 0">
        {test_groups.map((note) => (
          <Flex
            key={note.id}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.groupName}: {note.id}
            </Text>
            <Button variation="link" onClick={() => deleteEvent(note)}>
              Delete Group
            </Button>
          </Flex>
        ))}
      </View> */}
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
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
export default CreateCalendarGroup;
