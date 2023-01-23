import logo from "./logo.svg";
import "./App.css";
import Calendar from "./components/CalendarPage";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, Button, View, Card } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App({ signOut }) {
  const [userInfo, setUserInfo] = useState();
  const [nickname, setNickname] = useState();

  const [showSidebar, setShowSidebar] = useState(false);
  async function fetchUser() {
    const user = await Auth.currentUserInfo();
    setUserInfo(user);
  }
  useEffect(() => {
    fetchUser();
  }, []);

  async function updateUsername() {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      nickname: nickname,
    });
    fetchUser();
  }
  return (
    <View className="App">
      <Header userInfo={userInfo} signOut={signOut} showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      {showSidebar && <Sidebar />}
      <Card>
        {/* <div class="bg-blue-500 w-auto h-16">USER: {userInfo !== undefined ? userInfo.username: ""} Nickname: {userInfo !== undefined ? userInfo.attributes.nickname : ""}</div> */}
        {/* <div class="flex flex-row">
          <h1>Set Nickname:</h1>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Small input
          </label>
          <input
            type="text"
            id="small-input"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e)=>{setNickname(e.target.value)}}
          />
          <button
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
            onClick={updateUsername}
          >
            Change Nickname
          </button>
        </div> */}
        <Calendar />
      </Card>
      <Footer />
    </View>
  );
}

export default withAuthenticator(App);
