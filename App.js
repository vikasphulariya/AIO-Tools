// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Screens/Home';
import Cal from './Screens/cal';
import Home from './Screens/Home';
// import Timer from './Screens/timer';
import QRScan from './Screens/QR/QRScan';
import MainContainer from './Screens/qr';
import Wha from './Screens/Whatsapp/wha';
import Todo from './Screens/Todo/Todo';
import QRdata from './Screens/QR/QRdata';
import Loc from './Screens/Location/navigation';
import Notes from './Screens/Notes/Notes';
import NewNote from './Screens/Notes/newNote';
import ViewNote from './Screens/Notes/viewNote';
import ViewPassword from './Screens/Password/viewPassword';
import Clock from './Screens/clock';
import Password from './Screens/Password/password';
import NewPassword from './Screens/Password/newPassword';
import Tictactoe from './Screens/tic-tac-toe/tic-tac-toe';
// import Pdf from './Screens/img2pdf/Pdf';
import PDF from './Screens/img2pdf/Pdf';
import Emp from './Screens/img2pdf/emp';
import WeatherHome from './Screens/Weather/WeatheHome';
import StateWise from './Components/Screens/StateWise';
import India from './Components/Screens/India';
import Login from './Screens/user/Login';
import UserProfile from './Screens/user/User';
import BMI from './Screens/Bmi';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Utilites" component={Home} />
        {/* <Stack.Screen name="Timer" component={Timer} /> */}
        <Stack.Screen name="QR" component={MainContainer} options={{headerShown:false}}/>
        <Stack.Screen name="QR Data" component={QRdata} options={{headerShown:false}}/>
        <Stack.Screen name="Calculator" component={Cal} options={{headerShown:false}}/>
        <Stack.Screen name="Saved Loaction" component={Loc} options={{headerShown:false}} />
        <Stack.Screen name="Todo" component={Todo}  options={{headerShown:false}}  />
        <Stack.Screen name="Whatsapp Message a Number" component={Wha} options={{headerShown:false}}/>
        <Stack.Screen name="Notes" component={Notes} options={{headerShown:false}}/>
        <Stack.Screen name="View Note" component={ViewNote} options={{headerShown:false}}/>
        <Stack.Screen name="View Password" component={ViewPassword} options={{headerShown:false}}/>
        <Stack.Screen name="Add a Note" component={NewNote} options={{headerShown:true}}/>
        <Stack.Screen name="Add a Password" component={NewPassword} options={{headerShown:true}}/>
        <Stack.Screen name="StopWatch" component={Clock} options={{headerShown:false}}/>
        <Stack.Screen name="Password" component={Password} options={{headerShown:false}}/>
        <Stack.Screen name="tic-tac-toe" component={Tictactoe} options={{headerShown:false}}/>
        <Stack.Screen name="PDF" component={PDF} options={{headerShown:false}}/>
        <Stack.Screen name="Weather" component={WeatherHome} options={{headerShown:false}}/>
        {/* <Stack.Screen name="Emp" component={Emp} options={{headerShown:false}}/> */}
        <Stack.Screen name="India" component={India} options={{headerShown:false}} />
        <Stack.Screen name="StateWise" component={StateWise} options={{headerShown:false}} />
        <Stack.Screen name="User" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={UserProfile} options={{headerShown:false}} />
        <Stack.Screen name="BMI" component={BMI} options={{headerShown:false}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;