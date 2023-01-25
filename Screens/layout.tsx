import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import Torch from 'react-native-torch';
import {useState} from 'react'
import React from 'react';

export default function Layout() {
  const [torchs, setTorchs] = useState(false);
  const torch = async ()=>{
      await Torch.switchState(!torchs);
      // console.log("eg") 
      setTorchs(!torchs);
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.rows}>
        <TouchableOpacity onPress={()=>{torch()}}>

       <Image style={styles.icons} source={require('./Icons/cal.png')}>
        </Image> 
        </TouchableOpacity>
       <Image style={styles.icons} source={require('./Icons/cal.png')}></Image> 
       <Image style={styles.icons} source={require('./Icons/cal.png')}></Image> 
       <Image style={styles.icons} source={require('./Icons/cal.png')}></Image> 
       <Image style={styles.icons} source={require('./Icons/cal.png')}></Image> 
       <Image style={styles.icons} source={require('./Icons/cal.png')}></Image> 
       <Image style={styles.icons} source={require('./Icons/cal.png')}></Image> 
       <Image style={styles.icons} source={require('./Icons/cal.png')}></Image> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    
  },
  rows:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap:'wrap'
    // backgroundColor: 'grey',
  },
  icons:{
    width:70,
    height:70,
    margin:10,
  }
});
