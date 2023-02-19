import { View, Text, TextInput, Image, StatusBar, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, memo } from 'react'
import Clipboard from '@react-native-community/clipboard';
import QRCode from 'react-native-qrcode-svg';
// import { styles } from '../clock/stopwatch';

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

        <View style={{ alignContent: "center", alignItems: "center", marginTop: StatusBar.currentHeight }}>
            <View style={styles.topBarView}>
                <TextInput placeholder='Enter Text'
                    onChangeText={(value) => changeqr(value)}
                    style={styles.topBarText}></TextInput>
                <TouchableOpacity onPress={fetchCopiedText}>
                    <Image source={require('./map.png')} style={styles.icon} />
                    {/* <Text style={{ borderWidth: 3, borderRadius: 10, marginTop: "10%", fontSize: 30, backgroundColor: "pink", paddingHorizontal: 5, color: "black",elevation:30}}> Paste from Clipboard</Text> */}
                </TouchableOpacity>
            </View>


            <View style={styles.text}>


                <View style={{ alignContent: "center", alignItems: "center", borderRadius: 10, marginTop: "17%" }}>

                    <QRCode value={qrval} size={300} />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        margin: 10,

        alignContent: "center",
        alignItems: "center",
        height: "100%"
    },
    topBarView: {
        width: "100%", marginTop: '3%',

        //  backgroundColor: "orange",
        alignContent: "center",
        justifyContent: "space-around",
        // flexDirection: "row",
        // height: 80,
        padding: 10,
        flexDirection: "row",
        height: "20%",
    },
    topBarText:
    {
        color: "black",
        borderColor: "#c0c0c0",
        backgroundColor: '#fff',
        width: "80%",
        height:40,
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10,
        elevation: 10,
        marginTop: 20,
        // alignItems: "center",
        fontSize: 19,
        // elevation: 1
    },
    icon: {
        width: 40,
        height: 40,
        elevation: 20,
        marginTop: 20,
    }
})

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