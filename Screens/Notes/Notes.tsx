import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import SavedNotes from './Components/SavedNotes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


export default function Notes({ navigation }) {

    const [noteList, setNoteList] = useState([])
    const isFocused = useIsFocused();
    useEffect(() => {
        getNotesFromUserDevice();
    }, [isFocused]);

    const getNotesFromUserDevice = async () => {
        // console.log("getNotesFromUserDevice")
        try {
            const notesdata = await AsyncStorage.getItem('Notes');
            if (notesdata != null) {
                setNoteList(JSON.parse(notesdata));
                // console.log(taskItems);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveNoteToDevice = async (index) => {
        try {
            let temp = [...noteList];
        temp.splice(index, 1);
        // console.log(temp);
        setNoteList(temp);
            const notedatatodevice = JSON.stringify(temp)
            await AsyncStorage.setItem('Notes', notedatatodevice);
            // console.log("k",notedatatodevice)
        }
        catch (err) {
            console.log(err)
        }
    }

    const addNote = async () => {
        navigation.navigate('Add a Note')
    }

    const deleteNote = (index) => {
        // console.log(index);
        let temp = [...noteList];
        temp.splice(index, 1);
        // console.log(temp);
        setNoteList(temp);   
    }

   const viewNote =  (dataofnote) => {
    navigation.navigate('View Note',{
        qrd: dataofnote,
      });
   }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Your Note's</Text>
            </View>






            <FlatList
                data={noteList}
                renderItem={(item, index) => {
                    return (

                        <View style={styles.items}>
                            <View style={styles.NotesView}>
                                <TouchableOpacity onPress={() =>{
                                    viewNote(item);
                                }}>
                                    <SavedNotes text={item.item.t} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => {
                                // console.log("vikas")
                                saveNoteToDevice(item.index);}}>
                                    <Image style={styles.icon} source={require('./Components/dele.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    );
                }

                }

            />

            <View
                style={styles.foot}>
                <TouchableOpacity style={styles.addbtn} onPress={() => { addNote() }}>

                    <Text style={styles.addtxt}>+</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

{/* setmapurl(`https://maps.google.com/?q=${currentLatitude},${currentLongitude}`) */ }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
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
    NotesView: {
        width: '88%',
        elevation:10,
    },
    icon: {
        width: 24,
        height: 24,
        margin: 1,
        marginBottom: 8,
        marginHorizontal: 10,
        padding: 15,
        elevation: 5,
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
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
        paddingRight: 30
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
        elevation:10
    },
    addtxt: {
        fontSize: 24,
    },
    title: {
        fontSize: 24,
        margin: 15,
        marginHorizontal: 25,
        fontWeight: 'bold',
        paddingTop: 10,
    }
});
