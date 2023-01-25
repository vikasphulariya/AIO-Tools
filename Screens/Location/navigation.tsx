import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Image, ToastAndroid, Linking, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import SavedLocations from './Components/SavedLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Loc() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("Waiting for Permission");
  const [GetLoc, setGetLoc] = useState("")
  const [locName, setlocName] = useState('')
  const [per, setper] = useState(false)
  const [savedLocations, setSavedLocations] = useState([])

  useEffect(() => {
    getLocationsFromUserDevice();
  }, []);

useEffect(() => {
saveLocToDevice();
},[savedLocations]);
    
  const saveLocToDevice = async () => {
    try {
        const stringifylocationsdata = JSON.stringify(savedLocations);
        // console.log(stringifyTodos)
        await AsyncStorage.setItem('Locations', stringifylocationsdata);
        // console.log('Todo saved successfully')
      } catch (error) {
        console.log(error);
      }
}

  const getLocationsFromUserDevice = async () => {
    try {
      const locationsdata = await AsyncStorage.getItem('Locations');
      if (locationsdata != null) {
        setSavedLocations(JSON.parse(locationsdata));
        // console.log(taskItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addloc = async () => {
    if (!per) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setper(true)
        getLoc()
      }
      else {
        setErrorMsg('Permission to access location was granted');
        return;
        
      }
    }
    else{
      getLoc()
    }
  }
  const getLoc = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const url=`https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`
      const newLoc={
        location:locName,
        url:url
      }
      setSavedLocations([...savedLocations,newLoc])
      Keyboard.dismiss()
      setlocName('')
    }
    catch (err) {
      ToastAndroid.show('Location Not available!', ToastAndroid.SHORT);
      setErrorMsg("Location Not available Check Permissions")
    }
  }


  const deleteNote = (index) => {
    // console.log(index);
    let temp = [...savedLocations];
    temp.splice(index, 1);
    setSavedLocations(temp);
}

const VisitMap =async(mapurl)=>{
  await Linking.openURL(mapurl)
}


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Your Saved Location's</Text>
      </View>


      



      <FlatList
                    data={savedLocations}
                    renderItem={(item, index) => {
                        return (

                          <View style={styles.items}>
                          <View style={styles.locations}>
                            <TouchableOpacity onPress={()=>VisitMap(item.item.url)}>
                            <SavedLocations text={item.item.location} />
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity onPress={()=>deleteNote(item.index)}> 

                            <Image style={styles.icon} source={require('./Components/dele.png')} />
                            </TouchableOpacity>
                          </View>
                        </View>

                        );
                    }

                    }

                />


      
      






      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.foot}>
        <TextInput placeholder='Add Location' style={styles.keybord} value={locName}
          onChangeText={(value) => {
            setlocName(value);
          }}
        />
        <TouchableOpacity style={styles.addbtn} onPress={()=>{addloc()}}>

          <Text style={styles.addtxt}>+</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
}

{/* setmapurl(`https://maps.google.com/?q=${currentLatitude},${currentLongitude}`) */ }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignContent: 'center',
    // padding: 20,
  },
  button: {
    backgroundColor: 'pink',
    borderColor: 'black',
    borderWidth: 3,
    padding: 4,
    borderRadius: 5,
    margin: 5
  },
  locations: {
    width: '88%'
  },
  icon: {
    width: 24,
    height: 24,
    margin: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 15,

  },
  items: {
    flexDirection: 'row',
    // alignContent:'center',
    // justifyContent:'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  foot: {
    position: 'absolute',
    bottom: 40,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderWidth:1

  },
  keybord: {
    paddingVertical: 10,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    elevation: 15
  },
  addbtn: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    elevation: 15
  },
  addtxt: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    margin: 15,
    marginHorizontal: 25,
    fontWeight: 'bold',
    paddingTop:14
  }
});
