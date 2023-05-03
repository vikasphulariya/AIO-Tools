

import React, { useState, useCallback, memo,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import auth from '@react-native-firebase/auth';
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


  useEffect(() => {
   
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // navigation.replace("Home")
      }
      else{
        navigation.replace("User");
      }
    })

    return unsubscribe
  }, [])

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
    <View style={{flex:1}}>
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
        <TouchableOpacity onPress={() => utApps("tic-tac-toe")}>
          <Image style={[Homestyle.icons,{}]} source={require('./Icons/tic-tac-toe.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("PDF")}>
          <Image style={[Homestyle.icons,{}]} source={require('./Icons/pdf.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("Weather")}>
          <Image style={[Homestyle.icons,{}]} source={require('./Icons/weather.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("India")}>
          <Image style={[Homestyle.icons,{}]} source={require('./Icons/covid.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utApps("BMI")}>
          <Image style={[Homestyle.icons,{}]} source={require('./Icons/bmi.png')} />
        </TouchableOpacity>
      </View>
      {/* <View style={{position:'absolute',bottom:20,
      right:20,borderRadius:50,elevation:20}}> */}
        <TouchableOpacity onPress={() => utApps("Home")}  style={{position:'absolute',bottom:20,
      right:20,borderRadius:50,elevation:20}}>

      <Image style={{height: 90,alignSelf:'center',
        aspectRatio:1}} source={require('./Icons/user.png')}/>
        </TouchableOpacity>
      {/* </View> */}
    </View>
  )
}

export default memo(Home)