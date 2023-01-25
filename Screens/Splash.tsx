import { View, Text ,Image,StatusBar} from 'react-native'
import React from 'react'
// import { Image } from 'react-native-svg'
import { Homestyle } from './Styles'
// import { StatusBar } from 'react-native/Libraries/Components/StatusBar/StatusBar'
export default function Splash() {
  return (
    <View style={Homestyle.splashview}>
      <StatusBar hidden={true}/>
        <View style={Homestyle.Splashlogo}>
        <Image style={Homestyle.Splashicon} source={require('./Icons/sp.png')} /> 
      <Text style={Homestyle.Splashtitle}>AIO Tools</Text>
        </View>
        <View style={Homestyle.footer}>
          <Text style={Homestyle.footertext}> Made With ❤️ </Text>
          <Text style={Homestyle.footertext}> By Vikas Phulriya</Text>
        </View>
    </View>
  )
}