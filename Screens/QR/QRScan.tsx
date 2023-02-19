import { View, Text, StatusBar, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
const QRScan = ({ navigation }) => {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [per, setPer] = useState(false)
  const [qrd, setqrd] = useState('');
  function onSuccess(e) {
    ToastAndroid.showWithGravity(
      'Scan Successfull',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    navigation.navigate("QR Data", {
      qrd: e.data
    })
  };
  const [fl, setfl] = useState(false);
  const changefl = () => {
    setfl(!fl);
  };
  const onFailure =async()=> {
   const {status} = await BarCodeScanner.requestPermissionsAsync();
  //  console.log(status);
   setPer(status==='granted');
  }
  onFailure();
  if (!per){
     onFailure();
     if(!per){
    return(
      <View style={{marginTop: StatusBar.currentHeight,justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
        <Text>Permissons not granted</Text>
      </View>
    )}
  }
    return (
      <View style={{ flex: 1,justifyContent:'center',alignContent:'center',alignItems:'center' }}>
        <View style={{elevation:15, borderRadius: 10,width:'93%', borderColor: 'black', height: '66.6%' ,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        
          <BarCodeScanner 
            onBarCodeScanned={(e) => onSuccess(e)}
            style={{
              height: '100%',
              width: '100%',
              // marginLeft: '50%',
              borderRadius:10,
              elevation: 10,
              borderWidth:20,
              borderBottomColor: 'black',

            }}

          />

        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          position: 'absolute', //Here is the trick
          bottom: 10,
          width: '100%',
          height: 'auto',
        }}>
          {/* <TouchableOpacity onPress={}>

            <Text style={{ borderWidth: 3, borderRadius: 10, marginTop: "10%", fontSize: 30, backgroundColor: "pink", paddingHorizontal: 5, color: "black" }}>Flash</Text>
          </TouchableOpacity> */}

        </View>
      </View>
    )
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16
  }
});

export default QRScan