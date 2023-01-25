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
// import Clock from './Screens/clock';
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
        <Stack.Screen name="Add a Note" component={NewNote} options={{headerShown:true}}/>
        {/* <Stack.Screen name="StopWatch" component={Clock} options={{headerShown:false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;