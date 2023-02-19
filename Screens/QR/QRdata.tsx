import { View, StatusBar ,TextInput,ToastAndroid,Button,Linking} from 'react-native'
import React, { useCallback } from 'react'
// import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'
import Clipboard from '@react-native-community/clipboard'
export default function QRdata({route,navigation}) {
    // console.log(route.params);

    const da=()=>{

        Clipboard.setString(route.params.qrd)
        ToastAndroid.showWithGravity(
            'Copied to Clipboard',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
    }

      const handlePress = async() => {
        // Checking if the link is supported for links with custom URL scheme.
        try {
          await Linking.openURL(route.params.qrd);
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
        } catch(e) {
          alert(`Don't know how to open this URL`);
        }
      }
    
  return (
    <View style={{marginTop: StatusBar.currentHeight}}>
      <TextInput editable={false} 
        multiline
        numberOfLines={4}
        maxLength={40} value={route.params.qrd}
        style={{color:"black"}}></TextInput>
        <View style={{flexDirection:'row',alignContent:'center',justifyContent:'space-around'}} >

        <Button onPress={da} title={"Copy"}></Button>
        <Button title="Open" onPress={handlePress}  ></Button>
        </View>
    </View>
  )
}