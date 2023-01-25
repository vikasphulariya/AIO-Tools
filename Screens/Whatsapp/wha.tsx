import { View, Text, TextInput,Linking } from 'react-native'
import React, { useState } from 'react'
// import { Pressable } from 'react-native/Libraries/Components/Pressable/Pressable'
import { validatePathConfig } from '@react-navigation/native'

export default function Wha() {
    const [what, setwhat] = useState("")
    const [no, setNo] = useState("91")
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontSize: 30 }}>Enter mobile Number</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                <Text style={{ color: 'black', fontSize: 30, marginRight: 20}}>Code</Text>
                <TextInput value='91' style={{ width: 40, padding: 0, paddingLeft: 10, borderRadius: 5, borderWidth: 2, margin: 10, backgroundColor: 'white', color: 'black' }}></TextInput>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                <TextInput placeholder=' Mobile No without Code' placeholderTextColor={"black"} 
                style={{ width: "70%", padding: 0, paddingLeft: 10, borderRadius: 5, borderWidth: 2, margin: 10, backgroundColor: 'white', color: 'black' }}
                onChangeText={(value)=>{
                    // console.log(value)
                    setwhat(value)
                }}
                maxLength={15}
                ></TextInput>

                {/* https://wa.me/919499334616  */}
            </View>
                <Text style={{ color: 'black', fontSize: 30 ,borderWidth:3,paddingHorizontal:10,borderRadius:5,margin:10}}
                 onPress={async() => {
                    // console.log("Press",what.length)
                    var nok=''
                    let numbers = '0123456789';
                    for (var i=0;i<(what.length);i++){
                        if(numbers.indexOf(what[i]) > -1 ){
                            nok=nok+what[i]
                        }
                    }
                    var urlofwhats="https://wa.me/"+no+nok
                    // console.log(urlofwhats)
                    try {
                        await Linking.openURL(urlofwhats);
                        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                        // by some browser in the mobile
                      } catch(e) {
                        alert("Something went wrong");
                      }
                    
                }}>Chat</Text>
        </View>
    )
}