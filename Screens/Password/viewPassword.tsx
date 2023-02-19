import { View, Text, TextInput, StatusBar,TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useState, } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ViewPassword({route,navigation}) {

    const [title, setTitle] = useState('')
    const [disc, setDisc] = useState('')
    const [noteList, setNoteList] = useState([])

    useEffect(() => {
        getNotesFromUserDevice();
        setDisc(route.params.qrd.item.d)
        setTitle(route.params.qrd.item.t)
        // console.log(route.params.qrd.index)
        
        // deleteNote(route.params.qrd.index)
      }, []);
      const deleteNote = (index) => {
        // console.log(index);
        
    }
      const getNotesFromUserDevice =async()=>{
        try {
            const notesdata = await AsyncStorage.getItem('Notes');
            if (notesdata != null) {
                setNoteList(JSON.parse(notesdata));
                // console.log("starting",JSON.parse(notesdata));
              // console.log(taskItems);
            }
          } catch (error) {
            console.log(error);
          }
      }
    // useEffect(() => {
    //     saveNoteToDevice();
    //     },[noteList]);

    const saveNoteToDevice =async(index)=>{
        try{
            let tempk = [...noteList];
            tempk.splice(index, 1);
            // console.log("edit",tempk)
            // console.log(temp);
            setNoteList(tempk);   
            const notedata={
                t:title,
                d:disc
            }
            let temp=[...tempk,notedata]
            setNoteList([...tempk,notedata])
            const notedatatodevice= JSON.stringify(temp)
            await AsyncStorage.setItem('Notes', notedatatodevice);
            navigation.goBack();
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <View style={{  marginTop:StatusBar.currentHeight+100}}>
            <TextInput value={title}
                placeholder='Note Title'
                onChangeText={(value) => setTitle(value)}
                style={Styles.titl} />
            <TextInput placeholder='Note Description'
            value={disc}
                style={Styles.Describe}
                editable={title.length!=0?true:false}
                multiline={true}
                onChangeText={(value) => setDisc(value)}
                numberOfLines={3} />
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
})