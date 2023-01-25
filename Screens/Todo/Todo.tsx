import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, Platform, TextInput, TouchableOpacity, Keyboard, Alert, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Task from './Components/task'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Todo() {
    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);
   
    useEffect(() => {
        getTodosFromUserDevice();
      }, []);

    useEffect(() => {
saveTodo();
    },[taskItems]);

    const deleteAllTodos = () =>{
        if(taskItems.length==0){
            ToastAndroid.show('Nothing to delete',ToastAndroid.SHORT);
        }
        else
         {Alert.alert('Confirm', 'Clear todos?', [
            {
              text: 'Yes',
              onPress: () => setTaskItems([]),
            },
            {
              text: 'No',
            },
          ]);}
    }

    const saveTodo = async () => {
        try {
            const stringifyTodos = JSON.stringify(taskItems);
            // console.log(stringifyTodos)
            await AsyncStorage.setItem('todos', stringifyTodos);
            // console.log('Todo saved successfully')
          } catch (error) {
            console.log(error);
          }

    }




    const getTodosFromUserDevice = async () => {
        try {
          const todos = await AsyncStorage.getItem('todos');
          if (todos != null) {
            setTaskItems(JSON.parse(todos));
            // console.log(taskItems);
          }
        } catch (error) {
          console.log(error);
        }
      };

    const handletask = () => {
        // console.log(task);
        if (task == '') {
            ToastAndroid.show('please Enter A task',ToastAndroid.SHORT );
          } else {
        Keyboard.dismiss();
        // setTask(text)
        setTaskItems([...taskItems, task]);
        setTask('')}
    }

    const deleteNote = (index) => {
        // console.log(index);
        let temp = [...taskItems];
        temp.splice(index, 1);
        setTaskItems(temp);
    }
    return (
        <View style={styles.contain}>


            <View style={styles.header}>
                <Text style={styles.headtitle}>Today's Task</Text>
                <Text style={styles.delete} onPress={()=>{deleteAllTodos()   }}>Delete</Text>
            </View>


            <View style={styles.items}>
                <FlatList
                    data={taskItems}
                    renderItem={(item, index) => {
                        return (<TouchableOpacity key={index} onPress={() => deleteNote(item.index)}>

                            <Task text={item.item} />
                        </TouchableOpacity>

                        );
                    }

                    }

                />

            </View>


            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={styles.keybordavoid} >
                <TextInput style={styles.keybord}
                    placeholder={'Add a task'}
                    onChangeText={text => setTask(text)
                    }
                    value={task}
                />
                <TouchableOpacity onPress={() => handletask()}
                    style={styles.addbtn}>
                    <Text style={styles.addtxt}>+</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
    },
    header: {
        paddingTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent:'space-between', 

    },
    headtitle: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    delete:{
        color: 'red',
        padding:5,
        marginTop: 3,
    },
    items: {
        marginTop: 20,
        paddingHorizontal: 10,
        elevation:10,
    },
    keybordavoid: {
        position: 'absolute',
        bottom: 60,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    keybord: {
        paddingVertical: 10,
        width: 250,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 60,
        borderColor: '#c0c0c0',
        borderWidth: 1,
        elevation:10
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
})