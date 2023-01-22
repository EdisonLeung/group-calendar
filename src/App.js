import logo from './logo.svg';
import './App.css';
import Calendar from './components/CalendarPage';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  View,
  Card,
} from "@aws-amplify/ui-react";

function App({ signOut }) {
  return (
    <View className="App">
      <Card>
        <Calendar/>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
