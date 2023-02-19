import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, ToastAndroid,StyleSheet, Image,Modal, TouchableOpacity, FlatList,TextInput, Alert } from 'react-native';
// import SavedPasswords from './Components/SavedPasswords';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import SavedPassword from './Components/SavedPassword';

export default function Password({ navigation }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [passwordList, setpasswordList] = useState([])
    const [passw, setPassw] = useState('')
    const [confirmPswd, setConfirmPswd] = useState('')
    const [lock, setLock] = useState([{
        paswordset:null,
        lockpswd:null
    }])
    const isFocused = useIsFocused();
    useEffect(() => {
        getPasswordFromUserDevice();
        getLockFromUserDevice();
    }, [isFocused]);

    const getLockFromUserDevice =async ()=>{
try {
    const lockpwsdData = await AsyncStorage.getItem('LockPassword');
            if (lockpwsdData != null) {
                let temp=JSON.parse(lockpwsdData)
                setLock([temp]);
                console.log(lock);
            }
} catch (error) {
    
}
    }


    const setLockpswd =async ()=>{
        if(passw.length<5){
            ToastAndroid.show("Password should be at least 5 characters long", 1)
            console.log("Password")
        }
        else if(passw==confirmPswd){
            setModalVisible(false)
            try {
                let temp={
                    paswordset:true,
                    lockpswd:passw
                }
                setLock([temp])
                const lockpwsdData = JSON.stringify(temp)
            await AsyncStorage.setItem('LockPassword', lockpwsdData);
            setPassw('')
            setConfirmPswd('')
            } catch (error) {
                
            }
        }
        else{
            ToastAndroid.show("password does not match",0.1);
        }
    }
    const getPasswordFromUserDevice = async () => {
        // console.log("getPasswordFromUserDevice")
        try {
            const passwordData = await AsyncStorage.getItem('Password');
            if (passwordData != null) {
                setpasswordList(JSON.parse(passwordData));
                // console.log(taskItems);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const forgetPswd =async()=>{
        {Alert.alert('Confirm', 'Doing so will reset all Passwords', [
            {
              text: 'Yes',
              onPress: async() => {
                let tempq=[]
                const Passworddatatodevice = JSON.stringify(tempq)
            await AsyncStorage.setItem('Password', Passworddatatodevice);
        let temp={
            paswordset:false,
            lockpswd:"passw"
        }
        setLock([temp])
        const lockpwsdData = JSON.stringify(temp)
    await AsyncStorage.setItem('LockPassword', lockpwsdData);
              },
            },
            {
              text: 'No',
            },
          ]);}
    }

    const savePasswordToDevice = async (index) => {
        try {
            let temp = [...passwordList];
        temp.splice(index, 1);
        // console.log(temp);
        setpasswordList(temp);
            const Passworddatatodevice = JSON.stringify(temp)
            await AsyncStorage.setItem('Password', Passworddatatodevice);
            // console.log("k",Passworddatatodevice)
        }
        catch (err) {
            console.log(err)
        }
    }
    const  unlockPswd =()=>{
        let tempPassword=lock[0].lockpswd
        if(tempPassword==passw){

            setModalVisible(false);
            setPassw('')
        }
        else{
            ToastAndroid.show("Wrong Password",1)
        }
    }

    const addPassword = async () => {
        navigation.navigate('Add a Password')
    }

    const deletePassword = (index) => {
        // console.log(index);
        let temp = [...passwordList];
        temp.splice(index, 1);
        // console.log(temp);
        setpasswordList(temp);   
    }

   const viewPassword =  (dataofPassword) => {
    navigation.navigate('View Password',{
        qrd: dataofPassword,
      });
   }


    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-around"}}>
                <Text style={styles.title}>Your Saved Pacssword's</Text>
                <TouchableOpacity onPress={()=>{
                    // console.log(lock[0].lockpswd)
            console.log("rrf")
            setModalVisible(true)
            console.log(lock[0].lockpswd)
        }
            }>

                <Image  style={styles.icon} source={require('./Components/open-lock.png')}/>
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={passwordList}
                renderItem={(item, index) => {
                    return (

                        <View style={styles.items}>
                            <View style={styles.PasswordsView}>
                                <TouchableOpacity onPress={() =>{
                                    viewPassword(item);
                                }}>
                                    <SavedPassword text={item.item} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => {
                                // console.log("vikas")
                                savePasswordToDevice(item.index);}}>
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
                <TouchableOpacity style={styles.addbtn} onPress={() => { addPassword() }}>

                    <Text style={styles.addtxt}>+</Text>
                </TouchableOpacity>

            </View>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        navigation.goBack();
        }}
        >
        <View style={{flex:1,backgroundColor:'#ebebeb',alignContent:'center',alignItems:'center'}}> 
        <View>
        
        <Text style={styles.title}>{lock[0].paswordset?'Enter':'Set'} Master Password</Text>
        <TextInput placeholder={lock[0].paswordset?'Enter Password':'Set Password'} secureTextEntry={true} style={styles.password} 
        value={passw} onChangeText={(value)=>{setPassw(value)}} />
        {lock[0].paswordset?null:
        <TextInput placeholder='Confirm Password' style={styles.password}
        value={confirmPswd} onChangeText={(value)=>{setConfirmPswd(value)}} />
    }
        </View>
            <View style={{flexDirection:'row-reverse',width:'70%',   justifyContent:'space-between'}}>

            <TouchableOpacity onPress={()=>{
                {lock[0].paswordset?unlockPswd():setLockpswd();}
                
            }}>

            <View style={[styles.addbtn,{marginTop:10}]}>
            <Text style={styles.addtxt}>✓</Text>
            </View>
            </TouchableOpacity>
            {lock[0].paswordset?
            <TouchableOpacity onPress={()=>{
                console.log("Pasword deleted");
                forgetPswd();

            }}>
                
            <View style={[styles.addbtn,{marginTop:10,borderRadius:10,width:'auto',paddingHorizontal:10}]}>

            <Text style={styles.addtxt}>Forget</Text>
            </View>
            </TouchableOpacity>
            :null
            }
             </View>
        </View>
            </Modal>
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
    PasswordsView: {
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
        paddingBottom:2
    },
    password:{
        borderColor:'#c0c0c0',
        borderWidth:1,
        borderRadius:10,
        backgroundColor: "#fff",
        padding:10,
        marginVertical:10,
        elevation:10,
    }
});
