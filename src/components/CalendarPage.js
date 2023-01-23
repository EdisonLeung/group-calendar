import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { API, Auth } from "aws-amplify";
import { listEvents } from "../graphql/queries";
import {
  createEvent as createEventMutation,
  deleteEvent as deleteEventMutation,
} from "../graphql/mutations";
import { Button, Flex, Text, View } from "@aws-amplify/ui-react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import EventModal from "../Modals/EventModal";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const COLORS = [
  "#86C6EE",
  "#C3D888",
  "#FDD0C7",
  "#FFDAC1",
  "#B5EAD7",
  "#C7CEEA",
  "#F9AE48",
];
function CalendarPage() {
  const [events, setEvents] = useState([]);

  const [repeatDays, setRepeatDays] = useState([]);
  const [allDay, setAllDay] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const [modalInfo, setModalInfo] = useState(undefined);
  const [zoom, setZoom] = useState(2.5);
  const [hideWeekend, setHideWeekend] = useState(false);

  const calendar_name = "Your Schedule";
  const user_to_color = {};
  function getOtherUserColor(username) {
    if (!(username in user_to_color)) {
      user_to_color[username] = COLORS[Object.keys(user_to_color).length + 1];
    }
    return user_to_color[username];
  }
  function handleRepeatClick(day) {
    let rval = [...repeatDays];
    if (repeatDays.indexOf(day) === -1) {
      rval.push(day);
    } else {
      rval = rval.filter((item) => item !== day);
    }
    setRepeatDays(rval);
  }

  async function organizeEvents(events) {
    const rval = [];
    const user = await Auth.currentUserInfo();

    events.map((event) => {
      const event_title = event.owner + " (" + event.title + ")";
      const event_color =
        event.owner === user.username
          ? COLORS[0]
          : getOtherUserColor(event.owner);
      if (event.repeat) {
        // console.log(event)
        rval.push({
          groupId: event.id,
          title: event_title,
          startTime:
            new Date(event.startTime).getHours() +
            ":" +
            new Date(event.startTime).getMinutes(),
          endTime:
            new Date(event.endTime).getHours() +
            ":" +
            new Date(event.endTime).getMinutes(),
          startRecur: new Date(),
          daysOfWeek: event.daysOfWeek,
          id: event.id,
          color: event_color,
        });
      } else {
        rval.push({
          title: event_title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          id: event.id,
          color: event_color,
          allDay: event.allDay,
        });
      }
    });
    setEvents(rval);
  }
  async function fetchEvents() {
    const apiData = await API.graphql({ query: listEvents });
    const eventsFromAPI = apiData.data.listEvents.items;
    organizeEvents(eventsFromAPI);
  }

  async function createEvent() {
    const data = {
      title: title,
      startTime: startDateTime,
      endTime: endDateTime,
      repeat: repeat,
      allDay: allDay,
      daysOfWeek: repeatDays,
    };
    await API.graphql({
      query: createEventMutation,
      variables: { input: data },
    });
    fetchEvents();
  }

  async function deleteEvent({ id }) {
    await API.graphql({
      query: deleteEventMutation,
      variables: { input: { id } },
    });
    fetchEvents();
  }

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="App">
      <h1 className="text-3xl mb-9">{calendar_name}</h1>
      <div class="grid grid-cols-6 gap-4">
        <div class="ml-3 rounded-xl flex flex-col shadow-xl bg-blue-100">
          <h1 class="text-3xl">Create Event</h1>
          <input
            type="text"
            class="bg-gray-50 m-5 rounded-lg border border-gray-300"
            placeholder="Event Name"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <div class="border-gray-300 m-2 flex flex-col rounded-lg">
            <div class="m-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Date/Time"
                  value={startDateTime}
                  onChange={(newValue) => {
                    setStartDateTime(newValue.$d);
                    const start = new Date(newValue.$d);
                    const adjust_end = new Date(
                      new Date(start).setHours(start.getHours() + 1)
                    );
                    setEndDateTime(adjust_end);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div class="flex justify-center m-1">
              <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 w-1/2">
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  onClick={() => setAllDay(!allDay)}
                />
                <label
                  for="bordered-checkbox-1"
                  class="w-full ml-2 text-sm font-medium"
                >
                  All Day
                </label>
              </div>
            </div>
            {!allDay && (
              <div class="m-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date/Time"
                    value={endDateTime}
                    onChange={(newValue) => {
                      setEndDateTime(newValue.$d);
                    }}
                  />
                </LocalizationProvider>
              </div>
            )}
            <div class="flex justify-center m-1">
              <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 w-1/2">
                <input
                  id="repeat"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  onClick={() => setRepeat(!repeat)}
                />
                <label for="repeat" class="w-full ml-2 text-sm font-medium">
                  Repeat
                </label>
              </div>
            </div>
            {repeat && (
              <div class="grid grid-cols-4 gap-1 m-2">
                {/* <p class="">Every:</p> */}
                {WEEK_DAYS.map((day) => {
                  return (
                    <div class="grid w-full">
                      <input
                        type="checkbox"
                        id={WEEK_DAYS.indexOf(day)}
                        key={WEEK_DAYS.indexOf(day)}
                        value=""
                        class="hidden peer"
                        required=""
                        onClick={() => {
                          handleRepeatClick(WEEK_DAYS.indexOf(day));
                        }}
                      />
                      <label
                        for={WEEK_DAYS.indexOf(day)}
                        class="p-1 text-gray-500 border-4 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div class="block">
                          <div class="w-full text-xs font-semibold">{day}</div>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
            <div class="flex">
              <button
                type="button"
                class="text-gray-800 w-full bg-gradient-to-br from-purple-400 to-blue-300 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                onClick={() => {
                  alert("Event Created");
                  createEvent();
                }}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-full h-auto mr-3 border-2 border-sky-500 rounded-xl shadow-xl">
          <FullCalendar
            aspectRatio={zoom}
            handleWindowResize
            initialView="timeGridWeek"
            scrollTime={"08:00:00"}
            displayEventTime={false}
            headerToolbar={{
              start: "title",
              center: "dayGridMonth,timeGridWeek,timeGridDay hideWeekend",
              end: "zoomOut zoomIn today prev,next",
            }}
            customButtons={{
              zoomIn: {
                text: "(-) Height",
                click: function () {
                  setZoom(zoom + 0.5);
                },
              },
              zoomOut: {
                text: "(+) Height",
                click: function () {
                  setZoom(zoom - 0.5);
                },
              },
              hideWeekend: {
                text: (hideWeekend ? "Show" : "Hide") + " Weekend",
                click: function () {
                  setHideWeekend(!hideWeekend);
                },
              },
            }}
            hiddenDays={hideWeekend ? [0, 6] : []}
            plugins={[dayGridPlugin, timeGridPlugin]}
            events={events}
            eventClick={(e) => {
              setModalInfo(e.event);
            }}
          />
        </div>
      </div>
      {/* <View margin="3rem 0">
        {events.map((note) => (
          <Flex
            key={note.id || note.title}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.title}
            </Text>
            <Button variation="link" onClick={() => deleteEvent(note)}>
              Delete Event
            </Button>
          </Flex>
        ))}
      </View> */}

      <EventModal
        open={modalInfo !== undefined}
        onClose={() => setModalInfo(undefined)}
        modalInfo={modalInfo}
        deleteEvent={deleteEvent}
      />
    </div>
  );
}
export default CalendarPage;
