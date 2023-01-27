import logo from "./logo.svg";
import "./App.css";
import Calendar from "./components/CalendarPage";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  View,
  Card,
  Text,
  Flex,
} from "@aws-amplify/ui-react";
import { API, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { listEvents } from "./graphql/queries";

const COLORS = [
  "#86C6EE",
  "#C3D888",
  "#FDD0C7",
  "#FFDAC1",
  "#B5EAD7",
  "#C7CEEA",
  "#F9AE48",
];

function App({ signOut }) {
  const [userInfo, setUserInfo] = useState();
  const [nickname, setNickname] = useState();
  const [eType, setEType] = useState("personal");
  const [showSidebar, setShowSidebar] = useState(false);
  const user_to_color = {};
  const [events, setEvents] = useState([]);

  async function fetchUser() {
    const user = await Auth.currentUserInfo();
    setUserInfo(user);
  }
  useEffect(() => {
    fetchUser();
  }, []);

  function getOtherUserColor(username) {
    if (!(username in user_to_color)) {
      user_to_color[username] = COLORS[Object.keys(user_to_color).length + 1];
    }
    return user_to_color[username];
  }

  async function fetchEvents(eventType) {
    const user = await Auth.currentUserInfo();
    // if (eventType === "personal") {
      const apiData = await API.graphql({ query: listEvents });
      const eventsFromAPI = apiData.data.listEvents.items.filter(
        (item) => item.group.includes(eventType === "personal" ? user.username : eventType)
      );
      // console.log(eventType)
      organizeEvents(eventsFromAPI);
    // } else {
    //   organizeEvents([])
    // }
    // console.log(eventsFromAPI)
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
  async function updateUsername() {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      nickname: nickname,
    });
    // fetchUser();
  }
  return (
    <View className="App">
      <Header
        userInfo={userInfo}
        signOut={signOut}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      {showSidebar && (
        <Sidebar
          setShowSidebar={setShowSidebar}
          userInfo={userInfo}
          setEventType={setEType}
          fetchEvents={fetchEvents}
        />
      )}
      <Card>
        {/* {eventType} */}
        <Calendar
          userInfo={userInfo}
          events={events}
          eventType={eType}
          fetchEvents={fetchEvents}
        />
      </Card>
      <Footer />
    </View>
  );
}

export default withAuthenticator(App);
