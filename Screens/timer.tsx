import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alarm from './timw/Alarm';
import Timerw from './timw/Timer';
import Stopw from './timw/stopw';

const Tab = createBottomTabNavigator();
export default function Timer() {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Alarm" component={Alarm} />
          <Tab.Screen name="Timerw" component={Timerw} />
          <Tab.Screen name="Stopw" component={Stopw} />

        </Tab.Navigator>
      );
}