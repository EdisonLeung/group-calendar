import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { createEvent } from "@testing-library/react";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function CalendarPage() {
  const [events, setEvents] = useState([
    { title: "event now", date: new Date(), color: "purple" },
    {
      groupId: "999",
      title: "Repeating Event",
      startTime: "7:00",
      endTime: "9:15",
      startRecur: new Date(),
      daysOfWeek: [1, 2, 4, 0],
    },
  ]);

  const [repeatDays, setRepeatDays] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [title, setTitle] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [date, setDate] = useState();

  const calendar_name = "Silly Ass Bitches";

  function handleRepeatClick(day) {
    let rval = [...repeatDays];
    if (repeatDays.indexOf(day) === -1) {
      rval.push(day);
    } else {
      rval = rval.filter((item) => item !== day);
    }
    setRepeatDays(rval);
  }

  function createEvent(){
    if (repeat) {
      setEvents([...events, {groupId: "6969", title: title, startTime: startTime, endTime: endTime, startRecur: new Date(), daysOfWeek: repeatDays}])
    } else {
      setEvents([...events, {title: title, date: new Date(date)}])
    }
  }
  return (
    <div className="App">
      <h1 className="text-3xl mb-9">{calendar_name}</h1>
      <div class="grid grid-cols-6 gap-4">
        <div class="ml-3 outline flex flex-col">
          <h1 class="text-3xl">Create Event {date}</h1>
          <input
            type="text"
            class="bg-gray-50 outline m-5"
            placeholder="Event"
            required
            onChange={(e)=>setTitle(e.target.value)}
          />
          <div class="outline m-2 flex flex-col">
            <div>
              <input type="checkbox" id="repeat-checkbox" />
              <label for="repeat-checkbox" class="ml-2 text-sm">
                All-day
              </label>
            </div>
            <div>
              Date:
              <input type="date" class="bg-gray-50 outline" required onChange={(e)=>setDate(e.target.value)} />
            </div>
            <div>
              Start Time:
              <input type="time" class="bg-gray-50 outline" required onChange={(e)=>setStartTime(e.target.value)} />
            </div>
            <div>
              End Time:{" "}
              <input type="time" class="bg-gray-50 outline" required onChange={(e)=>setEndTime(e.target.value)}/>
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
                onClick={()=>{
                  alert("Event Created")
                  createEvent()
                }}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-5 h-auto mr-3 outline">
          <FullCalendar
            aspectRatio={2}
            handleWindowResize
            initialView="timeGridWeek"
            scrollTime={"15:00:00"}
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
    </div>
  );
}

export default CalendarPage;
