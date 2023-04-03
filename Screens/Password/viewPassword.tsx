import { View, Text, TextInput, StatusBar,TouchableOpacity,StyleSheet,Image } from 'react-native'
import React, { useEffect, useState, } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../clock/stopwatch'


export default function ViewPassword({route,navigation}) {

    const [title, setTitle] = useState('')
    const [disc, setDisc] = useState('')
    const [website, setWebsite] = useState('')
    const [PasswordList, setPasswordList] = useState([])
    const [pswdVisible, setPswdVisible] = useState(true)
    useEffect(() => {
        getLockPasswordFromUserDevice();
        setDisc(route.params.qrd.item.d)
        setTitle(route.params.qrd.item.t)
        setWebsite(route.params.qrd.item.w)
        // console.log(route.params.qrd.index)
        
        // deleteNote(route.params.qrd.index)
      }, []);
      const deleteNote = (index) => {
        // console.log(index);
        
    }
      const getLockPasswordFromUserDevice =async()=>{
        try {
            const LockPassworddata = await AsyncStorage.getItem('Password');
            if (LockPassworddata != null) {
                setPasswordList(JSON.parse(LockPassworddata));
                // console.log("starting",JSON.parse(LockPassworddata));
              // console.log(taskItems);
            }
          } catch (error) {
            console.log(error);
          }
      }
    // useEffect(() => {
    //     saveNoteToDevice();
    //     },[PasswordList]);

    const saveNoteToDevice =async(index)=>{
        // console.log(index);
        try{
            let tempk = [...PasswordList];
            tempk.splice(index, 1);
            // console.log("edit",tempk)
            // console.log(temp);
            setPasswordList(tempk);   
            const Passworddata={
                w:website,
                t:title,
                d:disc,
            }
            let temp=[...tempk,Passworddata]
            setPasswordList([...tempk,Passworddata])
            const Passworddatatodevice= JSON.stringify(temp)
            await AsyncStorage.setItem('Password', Passworddatatodevice);
            navigation.goBack();
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={{justifyContent: 'center',
        // alignItems: 'center',
        alignContent: 'center', }}>

        <View style={{justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center', }}>
            <Text style={Styles.title}> {website} Password</Text>
            {/* <TextInput value={website}
                placeholder='Website/App' 
                onChangeText={(value) => setWebsite(value)}
                style={Styles.titl} /> */}

            <TextInput value={title}
                onChangeText={(value) => setTitle(value)}
                style={Styles.titl} />
<View style={[{flexDirection:'row'},Styles.Describe]}>

            <TextInput secureTextEntry={pswdVisible}
            value={disc}
            style={{width:'88%'}}
            editable={title.length!=0?true:false}
            onChangeText={(value) => setDisc(value)}
            />
            
            <TouchableOpacity onPress={()=>{setPswdVisible(!pswdVisible)}}>

            <Image style={Styles.icon} source={pswdVisible? require('./Components/hide.png'):require('./Components/eye.png')}/>
            </TouchableOpacity>
            </View>

            <View style={Styles.btnrow}>
                <TouchableOpacity onPress={() => {
                    // console.log('f')
                    navigation.goBack();
                }}>
                    <Text style={Styles.btn} >✕</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={disc.length==0?true:false} onPress={() => {
                    saveNoteToDevice(route.params.qrd.index);
                }}>

                    <Text style={Styles.btn}>✓</Text>
                </TouchableOpacity>
            </View>
        </View>
                    </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    titl: {
        backgroundColor: '#fff',
        width: '94%',
        padding: 10,
        borderRadius: 15,
        margin: '3%',
        elevation: 5,
       
        
    },
    Describe: {
        backgroundColor: '#fff',
        width: '94%',
        padding: 10,
        borderRadius: 15,
        margin: '3%',

        maxHeight: '70%',
        elevation: 10,
    },
    btnrow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btn: {
        padding: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        margin: 10,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderRadius: 50,
        elevation: 10,
    },
    icon: {
        width: 24,
        height: 24,
        margin: 1,
        marginBottom: 8,
        marginHorizontal: 10,
        padding: 15,
        elevation: 5,
        paddingTop:10,
    },
    title:{
        margin: 10,
        width:'100%',
        // backgroundColor:'#fff',
        textAlign: 'left',
        paddingLeft:'3%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
        fontSize: 32,
    }
    
})