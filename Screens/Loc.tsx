// import {
//     SafeAreaView,
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     PermissionsAndroid,
//     Platform,
//     Button,
//     ToastAndroid,
//     Linking,
//   } from 'react-native';
//   import React, {useState, useEffect} from 'react'
//   import Geolocation from '@react-native-community/geolocation';


// export default function Location() {
//     const [
//         currentLongitude,
//         setCurrentLongitude
//       ] = useState('...');
//       const [
//         currentLatitude,
//         setCurrentLatitude
//       ] = useState('...');
//       const [
//         locationStatus,
//         setLocationStatus
//       ] = useState('');
    
//       useEffect(() => {
//         const requestLocationPermission = async () => {
//           if (Platform.OS === 'ios') {
//             getOneTimeLocation();
//             subscribeLocationLocation();
//           } else {
//             try {
//               const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                 {
//                   title: 'Location Access Required',
//                   message: 'This App needs to Access your location',
//                 },
//               );
//               if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                 //To Check, If Permission is granted
//                 getOneTimeLocation();
//                 subscribeLocationLocation();
//               } else {
//                 setLocationStatus('Permission Denied');
//               }
//             } catch (err) {
//               console.warn(err);
//             }
//           }
//         };
//         requestLocationPermission();
//         return () => {
//           Geolocation.clearWatch(watchID);
//         };
//       }, []);
    
//       const getOneTimeLocation = () => {
//         setLocationStatus('Getting Location ...');
//         Geolocation.getCurrentPosition(
//           //Will give you the current location
//           (position) => {
//             setLocationStatus('You are Here');
    
//             //getting the Longitude from the location json
//             const currentLongitude = 
//               JSON.stringify(position.coords.longitude);
    
//             //getting the Latitude from the location json
//             const currentLatitude = 
//               JSON.stringify(position.coords.latitude);
    
//             //Setting Longitude state
//             setCurrentLongitude(currentLongitude);
            
//             //Setting Longitude state
//             setCurrentLatitude(currentLatitude);
//           },
//           (error) => {
//             setLocationStatus(error.message);
//           },
//           {
//             enableHighAccuracy: false,
//             timeout: 30000,
//             maximumAge: 1000
//           },
//         );
//       };
    
//       const subscribeLocationLocation = () => {
//         watchID = Geolocation.watchPosition(
//           (position) => {
//             //Will give you the location on location change
            
//             setLocationStatus('You are Here');
//             console.log(position);
    
//             //getting the Longitude from the location json        
//             const currentLongitude =
//               JSON.stringify(position.coords.longitude);
    
//             //getting the Latitude from the location json
//             const currentLatitude = 
//               JSON.stringify(position.coords.latitude);
    
//             //Setting Longitude state
//             setCurrentLongitude(currentLongitude);
    
//             //Setting Latitude state
//             setCurrentLatitude(currentLatitude);
//           },
//           (error) => {
            
//             setLocationStatus(error.message);
//           },
//           {
//             enableHighAccuracy: false,
//             maximumAge: 1000
//           },
//         );
//       };
//         const [mapurl,setmapurl] =useState('');
//       const openinmaps=async()=>{
//         if (locationStatus=='You are Here'){
//           setmapurl(`https://maps.google.com/?q=${currentLatitude},${currentLongitude}`)
//           console.log(mapurl)
//           try {
//             await Linking.openURL(mapurl);
//             // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//             // by some browser in the mobile
//           } catch(e) {
//             alert(`Don't know how to open this URL`);
//           }
//         }
//         else{
//           ToastAndroid.showWithGravity
//             ToastAndroid.showWithGravity(
//               'Location Not Found',
//               ToastAndroid.SHORT,
//               ToastAndroid.CENTER,
//             );
          
//         }
//       }
//   return  (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <View style={styles.container}>
         
//           <Text style={styles.boldText}>
//             {locationStatus}
//           </Text>
//           <Text
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 16,
//               color: 'red',
//             }}>
//             Longitude: {currentLongitude}
//           </Text>
//           <Text
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 16,
//               color: 'green',
//             }}>
//             Latitude: {currentLatitude}
//           </Text>
//           <View style={{marginTop: 20}}>
//             <Button
//               title="Refresh"
//               onPress={getOneTimeLocation}
//             />
//             <Button
//               title="Open In Maps"
//               onPress={openinmaps}
//             />
            
//           </View>
//         </View>
      

//       </View>
//     </SafeAreaView>
//   ); 
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'white',
//       padding: 10,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     boldText: {
//       fontSize: 25,
//       color: 'red',
//       marginVertical: 16,
//       textAlign: 'center'
//     },
//   });
import { View, Text } from 'react-native'
import React from 'react'

export default function Loc() {
  return (
    <View>
      <Text>Loc</Text>
    </View>
  )
}