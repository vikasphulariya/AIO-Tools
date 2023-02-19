

import React, { useState, useCallback, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Torch from 'react-native-torch';
import { Homestyle } from './Styles';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Home = ({ navigation }) => {

  const [isTorchOn, setIsTorchOn] = useState(false);
  const torchOn = () => {
    // Vibration.vibrate(1001,true);
    Torch.switchState(!isTorchOn);
    setIsTorchOn(!isTorchOn);
  };
  const utApps = useCallback(
    (sc) => {
      navigation.navigate(sc)
    },
    []
  )
  return (
    <View>
      <StatusBar style="dark" />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 ,flexWrap:'wrap'}}>
        <TouchableOpacity onPress={() => utApps("Calculator")}>
          <Image style={Homestyle.icons} source={require('./Icons/cal.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("StopWatch")}>
          <Image style={Homestyle.icons} source={require('./Icons/time.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("QR")}>
          <Image style={Homestyle.icons} source={require('./Icons/qr.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("Saved Loaction")}>
          <Image style={Homestyle.icons} source={require('./Icons/location.png')} />
        </TouchableOpacity>
      {/* </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}> */}

        <TouchableOpacity onPress={() => utApps("Notes")}>
          <Image style={Homestyle.icons} source={require('./Icons/notes.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("Todo")}>
          <Image style={Homestyle.icons} source={require('./Icons/todo.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("Whatsapp Message a Number")}>
          <Image style={Homestyle.icons} source={require('./Icons/wha.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={torchOn}>
          <Image style={Homestyle.icons} source={require('./Icons/flash.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("Password")}>
          <Image style={Homestyle.icons} source={require('./Icons/password-manager.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default memo(Home)