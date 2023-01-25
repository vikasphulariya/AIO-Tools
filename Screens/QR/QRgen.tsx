import { View, Text, TextInput, Button, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, memo } from 'react'
import Clipboard from '@react-native-community/clipboard';
import  QRCode  from 'react-native-qrcode-svg'; 

const QRgen = () => {

    const [qrval, setqrval] = useState("https://www.google.com/")
    function changeqr(value) {
        
        if (value == "") {
            setqrval("https://www.google.com/")
        }
        else {
            setqrval(value)
        }
    }
    const fetchCopiedText = async () => {
        try {
            const text = await Clipboard.getString();
            setqrval(text);
            ToastAndroid.showWithGravity(
                'Pasted Successfully',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        catch (err) {
            setqrval("https://www.google.com/")
            ToastAndroid.showWithGravity(
                'Cant Paste',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    };
    const [qrdownload, setqrdownload] = useState(null);
   
    return (
        
        <View style={{ alignContent: "center", alignItems: "center", backgroundColor: "orange" }}>
            <View style={{ width: "100%", backgroundColor: "pink", alignContent: "center", justifyContent: "center", borderBottomEndRadius: 10, borderBottomLeftRadius: 10 }}>
                <TextInput placeholder='Enter Text' onChangeText={(value) => changeqr(value)} style={{ color: "black", borderColor: "black", borderBottomWidth: 5, borderBottomEndRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}></TextInput>
            </View>
            <View style={{ margin: 10, alignContent: "center", alignItems: "center", height: "100%" }}>

                <TouchableOpacity onPress={fetchCopiedText}>

                    <Text style={{ borderWidth: 3, borderRadius: 10, marginTop: "10%", fontSize: 30, backgroundColor: "pink", paddingHorizontal: 5, color: "black",elevation:30}}> Paste from Clipboard</Text>
                </TouchableOpacity>

                <View style={{ alignContent: "center", alignItems: "center", borderRadius: 10, marginTop: "17%" }}>
                   
<QRCode value={qrval} size={200} />
                </View>
               
            </View>
        </View>
    )
}



export default memo(QRgen)


// import { View, Text } from 'react-native'
// import React from 'react'

// export default function QRgen() {
//   return (
//     <View>
//       <Text>QRgen</Text>
//     </View>
//   )
// }