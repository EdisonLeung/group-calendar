import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { createEvent } from "@testing-library/react";
import { API, Auth } from "aws-amplify";
import { listEvents } from "../graphql/queries";
import {
  createEvent as createEventMutation,
  deleteEvent as deleteEventMutation,
} from "../graphql/mutations";
import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { Button, Flex, Text, View } from "@aws-amplify/ui-react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import Sidenav from "./Sidebar";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const COLORS = ["#86C6EE", "#C3D888", "#FDD0C7", "#FFDAC1", "#B5EAD7", "#C7CEEA", "#F9AE48"]
function CalendarPage() {
  const [events, setEvents] = useState([]);

  const [repeatDays, setRepeatDays] = useState([]);
  const [allDay, setAllDay] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const calendar_name = "Your Schedule";
  const user_to_color = {}
  function getOtherUserColor(username) {
    if (!(username in user_to_color)) {
      user_to_color[username] = COLORS[Object.keys(user_to_color).length + 1]
    }
    return user_to_color[username]
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
      const event_title = event.owner + " (" + event.title +")"
      const event_color = event.owner === user.username ? COLORS[0] : getOtherUserColor(event.owner)
      if (event.repeat) {
        console.log(event)
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
        <div class="ml-3 outline flex flex-col">
          <h1 class="text-3xl">Create Event</h1>
          <input
            type="text"
            class="bg-gray-50 outline m-5"
            placeholder="Event Name"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <div class="outline m-2 flex flex-col">
            <div class="m-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Date/Time"
                  value={startDateTime}
                  onChange={(newValue) => {
                    setStartDateTime(newValue.$d);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div>
              <input type="checkbox" id="repeat-checkbox" />
              <label for="repeat-checkbox" class="ml-2 text-sm">
                All-day
              </label>
            </div>
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
            <div>
              <input
                type="checkbox"
                id="repeat-checkbox"
                onClick={() => setRepeat(!repeat)}
              />
              <label for="repeat-checkbox" class="ml-2 text-sm">
                Repeat
              </label>
            </div>
            {repeat && (
              <div class="grid grid-cols-3 gap-1">
                <h1>Every:</h1>
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
                        class="p-1 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
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
            <div class="outline">
              <button
                type="button"
                class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
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
        <div class="col-span-5 h-auto mr-3 outline">
          <FullCalendar
            aspectRatio={2.5}
            handleWindowResize
            initialView="timeGridWeek"
            scrollTime={"08:00:00"}
            headerToolbar={{
              start: "title",
              center: "dayGridMonth,timeGridWeek,timeGridDay",
              end: "today prev,next",
            }}
            plugins={[dayGridPlugin, timeGridPlugin]}
            events={events}
            eventColor=""
          />
        </div>
      </div>
      <View margin="3rem 0">
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
            <Text as="span">{note.title}</Text>
            <Button variation="link" onClick={() => deleteEvent(note)}>
              Delete Event
            </Button>
          </Flex>
        ))}
      </View>
    </div>
  );
}

export default CalendarPage;
