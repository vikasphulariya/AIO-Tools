import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRScan from './QR/QRScan';
import useIsReady from './QR/useIsReady';
import QRgen from './QR/QRgen';
//Screen names
const homeName = "QR Generator";
const detailsName = "QR Scan";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    // <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={{
          tabBarActiveTintColor: 'red',
          tabBarLabelStyle: { paddingBottom: 20,paddingTop:10, fontSize: 20 },
          tabBarInactiveTintColor: 'black',
          tabBarStyle:[{height:'8%'}]
        }}  
        >
        <Tab.Screen name={"QR Scan"} component={QRScan} options={{headerShown:false}}/>
        <Tab.Screen name={"QR Generator"} component={QRgen} options={{headerShown:false,}}/>
        {/* <Tab.Screen name={settingsName} component={SettingsScreen} /> */}

      </Tab.Navigator>
  );
    {/* </NavigationContainer> */}
}

export default MainContainer;